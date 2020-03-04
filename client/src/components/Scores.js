import React , {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getScores} from '../redux/actions/scoreActions'


function Scores() {
    const scoreData = useSelector(state => state.scoreData)
    
    return (
        <div>
            {scoreData.scores.length ? (
                <ul>
                    {scoreData.scores.map(score => <li key = {score._id}>
                        <p>{score.user_id}</p>    
                        <p>{score.createdAt}</p>  
                        <p>{score.score}</p>
                        
                        </li>)}
                </ul>

            ) : (<p>Loadingg......</p>)}
        </div>
    )
}

export default Scores
