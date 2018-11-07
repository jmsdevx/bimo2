//store from sim2prac
// import { createStore, compose, applyMiddleware } from "redux";
// import promiseMiddleware from "redux-promise-middleware";
// import noteReducer from "../ducks/reducer";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let storeMiddleware = composeEnhancers(applyMiddleware(promiseMiddleware()));

// export default createStore(noteReducer, storeMiddleware);

//multiple reducer store, no root
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promiseMiddleWare from "redux-promise-middleware";

import note_reducer from "./note_reducer";
import user_reducer from "./user_reducer";
import vocab_reducer from './vocab_reducer' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ note_reducer, user_reducer, vocab_reducer });
const middlewares = composeEnhancers(applyMiddleware(promiseMiddleWare()));
const store = createStore(reducers, middlewares);

export default store;
