import { AnyAction } from "redux";
import { call, put } from "redux-saga/effects";
import { getShowCast, getShowsApi, getShowswithCast, getSingleShow } from "../../apis";
import { castLoadedAction, showsLoadedAction, singleShowLoadedAction } from "../Action";

export function* getShows(action: AnyAction): Generator<any, any, any> {
  const shows = yield call(getShowswithCast, action.payload);
  yield put(showsLoadedAction(shows));
}

export function* getSingleShowSaga(action:AnyAction):Generator<any, any, any>{

  const show = yield call(getSingleShow , action.payload);
  yield put(singleShowLoadedAction(show));

}

export function* getCastSaga(action:AnyAction):Generator<any , any , any>{
  let cast = yield call(getShowCast ,action.payload);
  yield put(castLoadedAction(cast));
}