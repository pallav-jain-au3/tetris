import React from "react";
import { Link } from "react-router-dom";
import StartButton from "./StartButton";
import { useSelector } from "react-redux";
const Home = () => {
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <div className="container">
      <h1 class="text-center">Tetris</h1>
      {authenticated ? (
        <div>
          <Link to="/tetris">
            <StartButton>Play Now</StartButton>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/signup">
            <StartButton>Sign in</StartButton>
          </Link>
          <Link to="/login">
            <StartButton>Login</StartButton>
          </Link>
          <Link to="/tetris">
            <StartButton>Play Now as Guest</StartButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
