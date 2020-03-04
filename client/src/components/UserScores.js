import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Scores() {
  const user = useSelector(state => state.user);
  const {
    user: { scores, username },
    authenticated
  } = user;

  return (
    <div>
      {!authenticated ? (
        <p>
          Please Login to get your scores
          <a>
            <Link to="/login">Login</Link>
          </a>
        </p>
      ) : scores.length ? (
        <div>
          <ul>
            {scores.map(score => (
              <li key={score.scoreId}>{score.score}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No score added</p>
      )}
    </div>
  );
}

export default Scores;
