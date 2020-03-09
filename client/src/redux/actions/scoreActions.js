import { endpoint } from "../endpoint";
import { GET_SCORES } from "../types";
import axios from "axios";
export const getScores = dispatch => {
  axios.get(`${endpoint}/scores`).then(res => {
    if (res.data.scores.length) {
      let scoreData = {};
      scoreData.scores = res.data.scores.sort((a, b) => b.score - a.score);
      scoreData.highestScore = scoreData.scores[0];
      return dispatch({
        type: GET_SCORES,
        payload: scoreData
      });
    }
  })
  .catch(err => console.log(err));
};


export const addScore = (score, dispatch) => {
    let newScore  = {score}
    axios.post(`${endpoint}/score`, newScore)
    .then((res) => {
      console.log(res)
        getScores(dispatch)
    })  
    .catch(err => console.log(err)) 
}