import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promiseMiddleWare from "redux-promise-middleware";

import user_reducer from "./user_reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  user_reducer
});
const middlewares = composeEnhancers(applyMiddleware(promiseMiddleWare()));
const store = createStore(reducers, middlewares);

export default store;
