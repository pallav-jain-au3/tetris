import {SET_USER, LOADING_USER, CLEAR_ERRORS, SET_ERRORS} from '../types';
import axios from 'axios';
import {endpoint} from '../endpoint';


export const signupUser = (user, history, dispatch) => {
  axios.post(`${endpoint}/user/register`, user)
        .then(res => {
            setAuthorization(res.data.token)
            dispatch(getUserData());
            dispatch({
                type: CLEAR_ERRORS
            })
            history.push('/')
            return
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload:err.response.data
            })
            return
        })
}

const getUserData = () => dispatch =>{
    dispatch({
      type:  LOADING_USER 
    })
    axios.get(`${endpoint}/user/auth`)
    .then(res => dispatch({
        type: SET_USER,
        payload: res.data
    }))
    .catch(err => console.log(err))

}

const setAuthorization = (token) => {
  localStorage.setItem("auth-token", token);
  axios.defaults.headers.common["auth-token"] = token;
}