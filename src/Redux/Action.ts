import { Cast } from "../Models/Cast";
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

export const castLoadedAction: actionCreator<Cast[]> = (cast: Cast[]) => ({
  type: CAST_LOADED,
  payload: cast,
});
