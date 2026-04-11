import produce from "immer";
import { normalize, schema } from "normalizr";
import { AnyAction } from "redux";
import { Cast, CastShow, showCastType } from "../../Models/Cast";
import { Episode } from "../../Models/episode";
import { PersonSearchHit } from "../../Models/personSearch";
import { ScheduleRailItem } from "../../Models/schedule";
import { NormalizedShow, Show } from "../../Models/showType";
import {
  CAST_LOADED,
  EPISODES_FAILURE,
  EPISODES_FETCH,
  EPISODES_SUCCESS,
  HOME_FEED_FAILURE,
  HOME_FEED_FETCH,
  HOME_FEED_SUCCESS,
  PEOPLE_QUERY_CHANGE,
  PEOPLE_SEARCH_SUCCESS,
  QUERY_CHANGE,
  SHOWS_LOADED,
  SINGLE_SHOW_LOADED,
  SINGLE_SHOW_LOADING,
} from "../Action";

export type ShowState = {
  shows: NormalizedShow;
  query: string;
  query_shows: { [query: string]: number[] };
  loading: boolean;
  cast: CastShow;
  homeFeed: {
    loading: boolean;
    error: string | null;
    loaded: boolean;
    tvRows: ScheduleRailItem[];
    webRows: ScheduleRailItem[];
    discoverIds: number[];
  };
  people: {
    query: string;
    results: PersonSearchHit[];
    loading: boolean;
  };
  episodesByShowId: { [showId: number]: Episode[] };
  episodesLoadingId: number | null;
};

let initialShowState: ShowState = {
  shows: {},
  query: "",
  query_shows: {},
  cast: {},
  loading: false,
  homeFeed: {
    loading: false,
    error: null,
    loaded: false,
    tvRows: [],
    webRows: [],
    discoverIds: [],
  },
  people: {
    query: "",
    results: [],
    loading: false,
  },
  episodesByShowId: {},
  episodesLoadingId: null,
};




export function showReducer(
  showState = initialShowState,
  action: AnyAction
): ShowState {
  switch (action.type) {
    case QUERY_CHANGE:
      return produce(showState, (draft) => {
        draft.query = action.payload;
        draft.loading = true;
      });

    case SHOWS_LOADED:
      return produce(showState, (draft) => {
        let responseData = action.payload as showCastType[];
        let show:Show[] = responseData.map((item:showCastType)=>item.show);

        let castArray = [];
        for(let i =0 ;i<responseData.length;i++){
          let showObj = {  [responseData[i].show.id] : responseData[i].cast }
          castArray.push(showObj);
        }

        let ObjData = castArray.reduce((prev , current)=>{
          return {...prev , ...current }
        },{})
        let temp = Object.keys(ObjData).map((id)=>{
         return { [id]: ObjData[+id].reduce((prev , current)=>{
            return {...prev , [current.id] : current } 
          },{}) }
        })
        let finalCastData = temp.reduce((prev:CastShow , current)=>{
          return {...prev , ...current};
        },{})
        draft.cast = finalCastData!;

        let showEntity = new schema.Entity("shows");
        let NormalizedShow = normalize(show, [showEntity]);
        draft.query_shows[draft.query] = NormalizedShow.result;
        draft.shows = { ...draft.shows, ...NormalizedShow.entities.shows };
        draft.loading = false;
      });
      
    case SINGLE_SHOW_LOADING:
      return produce(showState, (draft) => {
        draft.loading = true;
      });

    case SINGLE_SHOW_LOADED:
      return produce(showState, (draft) => {
        let show: Show = action.payload;
        draft.shows = { ...draft.shows, [show.id]: action.payload };
        draft.loading = false;
      });
    case CAST_LOADED:
      return produce(showState, (draft) => {
        let data = action.payload._embedded.cast;
        let personEntity = new schema.Entity("person");
        let castEntity = new schema.Entity("cast", { person: personEntity });
        let NormalizedCast = normalize(data, [castEntity]);
        draft.cast = {...draft.cast , [action.payload.id] : NormalizedCast.entities.person! } || {};
        draft.loading = false;
      });

    case HOME_FEED_FETCH:
      return produce(showState, (draft) => {
        draft.homeFeed.loading = true;
        draft.homeFeed.error = null;
      });

    case HOME_FEED_SUCCESS:
      return produce(showState, (draft) => {
        draft.homeFeed.loading = false;
        draft.homeFeed.error = null;
        draft.homeFeed.loaded = true;
        const p = action.payload as {
          tvRows: ScheduleRailItem[];
          webRows: ScheduleRailItem[];
          discoverIds: number[];
          mergedShows: Show[];
        };
        draft.homeFeed.tvRows = p.tvRows;
        draft.homeFeed.webRows = p.webRows;
        draft.homeFeed.discoverIds = p.discoverIds;
        for (const s of p.mergedShows) {
          draft.shows[s.id] = { ...draft.shows[s.id], ...s } as Show;
        }
      });

    case HOME_FEED_FAILURE:
      return produce(showState, (draft) => {
        draft.homeFeed.loading = false;
        draft.homeFeed.error = action.payload as string;
      });

    case PEOPLE_QUERY_CHANGE:
      return produce(showState, (draft) => {
        draft.people.query = action.payload;
        draft.people.loading = true;
      });

    case PEOPLE_SEARCH_SUCCESS:
      return produce(showState, (draft) => {
        draft.people.results = action.payload as PersonSearchHit[];
        draft.people.loading = false;
      });

    case EPISODES_FETCH:
      return produce(showState, (draft) => {
        draft.episodesLoadingId = +(action.payload as string);
      });

    case EPISODES_SUCCESS:
      return produce(showState, (draft) => {
        const { showId, episodes } = action.payload as {
          showId: number;
          episodes: Episode[];
        };
        draft.episodesByShowId[showId] = episodes;
        draft.episodesLoadingId = null;
      });

    case EPISODES_FAILURE:
      return produce(showState, (draft) => {
        const id = action.payload as number;
        draft.episodesLoadingId = null;
        if (id && draft.episodesByShowId[id] === undefined) {
          draft.episodesByShowId[id] = [];
        }
      });

    default:
      return showState;
  }
}
