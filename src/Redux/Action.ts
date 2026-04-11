import { ShowWithEmbeddedCast } from "../Models/Cast";
import { Episode } from "../Models/episode";
import { PersonSearchHit } from "../Models/personSearch";
import { ScheduleRailItem } from "../Models/schedule";
import { Show } from "../Models/showType";

export const QUERY_CHANGE = "QUERY_CHANGE";

export type actionCreator<T = undefined> = (...args: any) => {
  type: string;
  payload?: T;
};

export const queryChangeAction: actionCreator<string> = (query: string) => ({
  type: QUERY_CHANGE,
  payload: query,
});

export const SHOWS_LOADED = "SHOWS_LOADED";

export const showsLoadedAction = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows,
});

export const SINGLE_SHOW_LOADING = "SINGLE_SHOW_LOADING";

export const singleShowLoadingAction: actionCreator<string> = (id: string) => ({
  type: SINGLE_SHOW_LOADING,
  payload: id,
});

export const SINGLE_SHOW_LOADED = "SINGLE_SHOW_LOADED";

export const singleShowLoadedAction: actionCreator<Show> = (show: Show) => ({
  type: SINGLE_SHOW_LOADED,
  payload: show,
});


export const CAST_LOADED = "CAST_LOADED";

export const castLoadedAction: actionCreator<ShowWithEmbeddedCast> = (
  payload: ShowWithEmbeddedCast
) => ({
  type: CAST_LOADED,
  payload,
});

export const HOME_FEED_FETCH = "HOME_FEED_FETCH";

export const homeFeedFetchAction = () => ({ type: HOME_FEED_FETCH });

export const HOME_FEED_SUCCESS = "HOME_FEED_SUCCESS";

export type HomeFeedPayload = {
  tvRows: ScheduleRailItem[];
  webRows: ScheduleRailItem[];
  discoverIds: number[];
  mergedShows: Show[];
};

export const homeFeedSuccessAction = (payload: HomeFeedPayload) => ({
  type: HOME_FEED_SUCCESS,
  payload,
});

export const HOME_FEED_FAILURE = "HOME_FEED_FAILURE";

export const homeFeedFailureAction = (message: string) => ({
  type: HOME_FEED_FAILURE,
  payload: message,
});

export const PEOPLE_QUERY_CHANGE = "PEOPLE_QUERY_CHANGE";

export const peopleQueryChangeAction: actionCreator<string> = (q: string) => ({
  type: PEOPLE_QUERY_CHANGE,
  payload: q,
});

export const PEOPLE_SEARCH_SUCCESS = "PEOPLE_SEARCH_SUCCESS";

export const peopleSearchSuccessAction = (payload: PersonSearchHit[]) => ({
  type: PEOPLE_SEARCH_SUCCESS,
  payload,
});

export const EPISODES_FETCH = "EPISODES_FETCH";

export const episodesFetchAction: actionCreator<string> = (showId: string) => ({
  type: EPISODES_FETCH,
  payload: showId,
});

export const EPISODES_SUCCESS = "EPISODES_SUCCESS";

export const episodesSuccessAction = (payload: {
  showId: number;
  episodes: Episode[];
}) => ({
  type: EPISODES_SUCCESS,
  payload,
});

export const EPISODES_FAILURE = "EPISODES_FAILURE";

export const episodesFailureAction = (showId: number) => ({
  type: EPISODES_FAILURE,
  payload: showId,
});
