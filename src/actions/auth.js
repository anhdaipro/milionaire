import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
   
} from './types';
import {loginURL,userinfoURL} from "../urls"
import axios from 'axios';
import { validatEemail } from '../constants';
const expirationDate = localStorage.getItem("expirationDate")
export const expiry=new Date(expirationDate).getTime() - new Date().getTime()
export const headers={'headers':{ Authorization:`JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwOTY0ODQ3LCJqdGkiOiJlNzQ1ZGFlMGMwODg0ZGYzYTQ4NTcwMGM3ODE0N2IxYSIsInVzZXJfaWQiOjF9.POFqNgJU6u5tNxa_toDgUlHvjDY8duu7gUonr6jMtkw`,'Content-Type': 'application/json' }}

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            const res = await axios.get(userinfoURL,{ 'headers': { Authorization:`JWT ${localStorage.token}` }})
            dispatch({
                 payload: res.data,
                    type: AUTHENTICATED_SUCCESS
            });
            localStorage.setItem('user',res.data.id);
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
            localStorage.removeItem('user')
           
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};



export const loginotp = (user_id) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
   
    try {
        const res = await axios.post(loginURL, JSON.stringify({user_id:user_id}), config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            
        });
        const expirationDate = new Date().getTime() + 1800 * 1000
        localStorage.setItem("expirationDate", expirationDate);
        const token = res.data.access;
        localStorage.setItem('token',token);
       
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const data=!validatEemail(username)?{username:username,password:password}:{email:username,password:password}
    try {
        const res = await axios.post(loginURL,JSON.stringify(data), config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            
        });
        localStorage.setItem("expirationDate", res.data.access_expires);
        const token = res.data.access;
        localStorage.setItem('token',token);
       
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const signup = (username, email, password,phone) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password, profile:{phone} });
   
    try {
        const res = await axios.post(`milionaireapp-production.up.railway.app/api/v1/register`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`milionaireapp-production.up.railway.app/api/v1/reset/password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uidb64, token, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uidb64, token,password});

    try {
        await axios.post(`milionaireapp-production.up.railway.app/api/v1/password-reset/${uidb64}/${token}/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT
    });
};
