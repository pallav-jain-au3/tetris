import React from 'react';
import Tetris from './components/Tetris';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {StyledTetrisWrapper} from './components/styles/StyledTetris';
import Login from './components/Login';
import Signup from './components/Signup';
import store from './redux/store';
import {Provider} from 'react-redux'

const App = () => (
  <Provider store = {store}>
  <div className = "app">
  
   <Router>
    <Switch>
      <Route exact path = '/' component = {Tetris} />
      <Route exact path = '/login' component = {Login} />
      <Route exact path = '/signup' component = {Signup} />
    </Switch>
   </Router>
   
   </div>
   </Provider>
)

export default App;