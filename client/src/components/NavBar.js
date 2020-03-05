import React, { Fragment } from "react";
import { StyledNavbar } from "./styles/StyledNavbar";
import { StyledNavItem } from "./styles/StyledNavItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

function NavBar() {
  let authenticated = useSelector(state => state.user.authenticated);
  let dispatch = useDispatch();
  return (
    <StyledNavbar>
      <h5>Tetris</h5>
      <nav>
        <ul>
          <StyledNavItem>
            <Link to="/">Home</Link>
          </StyledNavItem>
          <StyledNavItem>
            <Link to="/scores">Highest-Scores</Link>
          </StyledNavItem>
          {!authenticated ? (
            <Fragment>
              <StyledNavItem>
                <Link to="/signup">Signin</Link>
              </StyledNavItem>
              <StyledNavItem>
                <Link to="/login">Login</Link>
              </StyledNavItem>
            </Fragment>
          ) : (
            <Fragment>
              <StyledNavItem>
                <Link to="/user/scores">My Scores</Link>
              </StyledNavItem>
              <StyledNavItem>
                <button onClick={() => logoutUser(dispatch)}>Logout</button>
              </StyledNavItem>
            </Fragment>
          )}
        </ul>
      </nav>
    </StyledNavbar>
  );
}

export default NavBar;
