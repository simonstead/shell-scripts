import { createStore, applyMiddleware, compose } from "redux";
import App from "./reducers";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import persistSessionState from "redux-sessionstorage";
import { createTracker } from "redux-segment";

const Segment = createTracker();

const middlewares = [ReduxThunk, promiseMiddleware(), Segment];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(...middlewares),
  persistSessionState()
);

export function createDefaultStore() {
  return createStore(App, enhancers);
}

let Store = createStore(App, enhancers);

export default Store;
