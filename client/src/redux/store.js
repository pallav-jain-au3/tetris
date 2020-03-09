import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "./reducers/userReducers";
import scoreReducer from './reducers/ScoreReducer';

const intialState = {};
const reducer = combineReducers({
  user: userReducer,
  scoreData :scoreReducer

});

const store = createStore(
  reducer,
  intialState
);

export default store;