import { combineReducers, createStore } from "redux";
import { showReducer } from "./Subreducer/showReducer";
import { applyMiddleware } from 'redux'
import { rootSaga, sagamiddleware } from "./Saga";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  show: showReducer,
});

export type State = ReturnType<typeof reducer>;



export const Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagamiddleware))
);

sagamiddleware.run(rootSaga);
