import axios from 'axios';
import urls from '../constants/Urls'

//const BACKEND_URL = "http://192.168.43.166:1337/";
const BACKEND_URL = urls.backendUrl;

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR';

export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_ERROR = 'UPDATE_USER_DATA_ERROR';


function fetchUserDataSuccess(response) {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: response
  };
}

function fetchUserDataError(err) {
  return {
    type: FETCH_USER_DATA_ERROR,
    payload: err.response.data
  };
}

export function fetchUserData(bearerToken) {
  var config = {
    headers: {'Authorization': "bearer " + bearerToken}
  };
  return function(dispatch) {
    axios.get(BACKEND_URL + 'user', config)
      .then((response) => {
        dispatch(fetchUserDataSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchUserDataError(err));
      });
  };
}

function updateUserDataSuccess(response) {
  return {
    type: UPDATE_USER_DATA_SUCCESS,
    payload: response
  };
}

function updateUserDataError(err) {
  return {
    type: UPDATE_USER_DATA_ERROR,
    payload: err.response.data
  };
}

export function updateUserData(body, bearerToken) {
  var config = {
    headers: {'Authorization': "bearer " + bearerToken}
  };
  return function(dispatch) {
    axios.post(BACKEND_URL + 'user', body, config)
      .then((response) => {
        dispatch(fetchUserDataSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchUserDataError(err));
      });
  };
}
