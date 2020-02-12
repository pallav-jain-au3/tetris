import {SET_USER, LOADING_USER, SET_ERRORS, CLEAR_ERRORS} from '../types'
const intialState = {
    user :{},
    authenticated : false,
    loading: false,
    errors: {}
}

export default function (state = intialState, action){
    switch (action.type) {
        case SET_USER:
            return {
                ...state, user :action.payload, authenticated: true, loading :false
            } 
        case  LOADING_USER :
            return {
                ...state, loading:false
            }  
        case SET_ERRORS : 
            return {
                ...state, errors :action.payload
            }   
        case CLEAR_ERRORS :
            return {
                ...state, errors: {}
            }       
            

        
    
        default:
            return state;
    }
}