import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducers";
import scoreReducer from './reducers/ScoreReducer'

const intialState = {};
const middleware = [thunk];
const reducer = combineReducers({
  user: userReducer,
  scoreData :scoreReducer

});

const store = createStore(
  reducer,
  intialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;