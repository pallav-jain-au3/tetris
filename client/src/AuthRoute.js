import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
function AuthRoute({ component: Component, ...rest }) {
  let authenticated = useSelector(state => state.user.authenticated);

  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
