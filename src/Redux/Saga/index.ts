import { CAST_LOADED, QUERY_CHANGE, SINGLE_SHOW_LOADING } from "../Action";
import { getCastSaga, getShows, getSingleShowSaga } from "./SagaShows";
import { debounce, takeEvery, takeLatest } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

export const sagamiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield debounce(300 , QUERY_CHANGE, getShows);
  yield takeEvery(SINGLE_SHOW_LOADING, getSingleShowSaga);
  yield takeEvery(SINGLE_SHOW_LOADING , getCastSaga);
}
