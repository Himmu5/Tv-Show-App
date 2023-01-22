import produce from "immer";
import { normalize, schema } from "normalizr";
import { AnyAction } from "redux";
import { Cast, CastShow, showCastType } from "../../Models/Cast";
import { NormalizedShow, Show } from "../../Models/showType";
import {
  CAST_LOADED,
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
  cast: CastShow
};

let initialShowState: ShowState = {
  shows: {},
  query: "",
  query_shows: {},
  cast: {},
  loading: false,
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
    default:
      return showState;
  }
}
