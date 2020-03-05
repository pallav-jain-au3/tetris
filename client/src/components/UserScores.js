import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Table} from 'react-bootstrap'

function Scores() {
  const user = useSelector(state => state.user);
  const {
    user: { scores, username },
    authenticated
  } = user;
  dayjs.extend(relativeTime)

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
          <Table>
          <thead>
          <th>#</th>
          <th>Username</th>
          <th>Score</th>
          <th></th>
          </thead>
          <tbody>
            {scores.sort((a, b) => b.score - a.score).map((score, index) => (
              <tr key={score.scoreId}>
              <td>{index + 1}</td>
              <td>{username}</td>
                <td>{score.score}</td>
                <td>{dayjs(score.createdAt).fromNow()}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No score added</p>
      )}
    </div>
  );
}

export default Scores;
