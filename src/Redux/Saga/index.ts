import {
  CAST_LOADED,
  EPISODES_FETCH,
  HOME_FEED_FETCH,
  PEOPLE_QUERY_CHANGE,
  QUERY_CHANGE,
  SINGLE_SHOW_LOADING,
} from "../Action";
import {
  episodesSaga,
  getCastSaga,
  getShows,
  getSingleShowSaga,
  loadHomeFeedSaga,
  peopleSearchSaga,
} from "./SagaShows";
import { debounce, takeEvery, takeLatest } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

export const sagamiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield debounce(300, QUERY_CHANGE, getShows);
  yield takeEvery(SINGLE_SHOW_LOADING, getSingleShowSaga);
  yield takeEvery(SINGLE_SHOW_LOADING, getCastSaga);
  yield takeLatest(HOME_FEED_FETCH, loadHomeFeedSaga);
  yield debounce(350, PEOPLE_QUERY_CHANGE, peopleSearchSaga);
  yield takeLatest(EPISODES_FETCH, episodesSaga);
}
