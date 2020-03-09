import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Table } from "react-bootstrap";

function Scores() {
  const scoreData = useSelector(state => state.scoreData);
  dayjs.extend(relativeTime);

  return (
    <div>
      {scoreData.scores.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
          {scoreData.scores.map((score, index) => (
           
              <tr key={score._id}>
                <td>{index + 1}</td>
                <td>{score.username}</td>
                <td>{score.score}</td>
                <td>{dayjs(score.createdAt).fromNow()}</td>
              </tr>
           
          ))}
          </tbody>
        </Table>
      ) : (
        <p>Loadingg......</p>
      )}
    </div>
  );
}

export default Scores;
