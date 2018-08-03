import axios from 'axios';
import urls from '../constants/Urls'

//const BACKEND_URL = "http://192.168.43.166:1337/";
const BACKEND_URL = urls.backendUrl;

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGOUT = 'LOGOUT';

function registrationSuccess(response) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: response
  };
}

function registrationError(err) {
  return {
    type: REGISTER_USER_ERROR,
    payload: err.response.data
  };
}

export function registerUser(userCredentials) {
  return function(dispatch) {
    axios.post(BACKEND_URL + "signup", userCredentials)
      .then((response) => {
        dispatch(registrationSuccess(response));
      })
      .catch((err) => {
        dispatch(registrationError(err));
      });
  }
}

function loginSucces(response) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: response
  };
}

function loginError(err) {
  return {
    type: LOGIN_USER_ERROR,
    payload: err.response.data
  };
}

export function loginUser(userCredentials) {
  return function(dispatch) {
    axios.post(BACKEND_URL + "login", userCredentials)
      .then((response) => {
        dispatch(loginSucces(response));
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {}
  };
}
