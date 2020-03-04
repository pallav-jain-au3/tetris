import  {GET_SCORES} from '../types'

const initialState = {
    scores : [],
    highestScore :null,
    playersBestScore : null
}

export default function (state = initialState, actions){
    switch(actions.type){
        case GET_SCORES:
            return {
                ...state,
               ...actions.payload

            }
        default :
            return state
    }        
}