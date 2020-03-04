import React , {useEffect}from "react";
import Tetris from "./components/Tetris";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StyledTetrisWrapper } from "./components/styles/StyledTetris";
import Login from "./components/Login";
import Signup from "./components/Signup";
import store from "./redux/store";
import { Provider } from "react-redux";
import { SET_USER } from "./redux/types";
import axios from "axios";
import { getUserData } from "./redux/actions/userActions";
import AuthRoute from './AuthRoute';
import UserScores from './components/UserScores'
import Scores from './components/Scores';
import {getScores} from './redux/actions/scoreActions'


const App = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
    store.dispatch(getUserData());
  }

  useEffect(() => {
    getScores(store.dispatch)
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Tetris} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path = "/user/scores" component = {UserScores} />
          <Route exact path = '/scores' component = {Scores} /> 
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
