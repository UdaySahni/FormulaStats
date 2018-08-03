import axios from 'axios';
import urls from '../constants/Urls'

//const BACKEND_URL = "http://192.168.43.166:1337/";
const BACKEND_URL = urls.backendUrl;

export const FETCH_DRIVER_COMPARISION_SUCCESS = 'FETCH_DRIVER_COMPARISION_SUCCESS';
export const FETCH_DRIVER_COMPARISION_ERROR = 'FETCH_DRIVER_COMPARISION_ERROR';

export const FETCH_CONSTRUCTOR_COMPARISION_SUCCESS = 'FETCH_CONSTRUCTOR_COMPARISION_SUCCESS';
export const FETCH_CONSTRUCTOR_COMPARISION_ERROR = 'FETCH_CONSTRUCTOR_COMPARISION_ERROR';

function fetchDriverComparisionSuccess(response) {
  return {
    type: FETCH_DRIVER_COMPARISION_SUCCESS,
    payload: response
  };
}

function fetchDriverComparisionError(err) {
  return {
    type: FETCH_DRIVER_COMPARISION_ERROR,
    payload: err.response.data
  };
}


export function fetchDriverComparision(firstDriver, secondDriver, grandPrix, dataType, bearerToken) {
  var config = {
    headers: {'Authorization': "bearer " + bearerToken},
    params: {
      firstDriver: firstDriver,
      secondDriver: secondDriver,
      grandPrix: grandPrix
    }
  };
  var url = BACKEND_URL;
  if(dataType == 'Finish')
  {
    url = url + 'drivers/finishHistory';
  }
  else if(dataType == 'Grid') {
    url = url + 'drivers/startHistory';
  }
  else {
    url = url + 'drivers/fastestLapHistory';
  }
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch(fetchDriverComparisionSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchDriverComparisionError(err));
      });
  }
}

function fetchConstructorComparisionSuccess(response) {
  return {
    type: FETCH_CONSTRUCTOR_COMPARISION_SUCCESS,
    payload: response
  };
}

function fetchConstructorComparisionError(err) {
  return {
    type: FETCH_CONSTRUCTOR_COMPARISION_ERROR,
    payload: err.response.data
  };
}


export function fetchConstructorComparision(firstConstructor, secondConstructor, grandPrix, dataType, bearerToken) {
  var config = {
    headers: {'Authorization': "bearer " + bearerToken},
    params: {
      firstConstructor: firstConstructor,
      secondConstructor: secondConstructor,
      grandPrix: grandPrix
    }
  };
  var url = BACKEND_URL;
  if(dataType == 'Finish')
  {
    url = url + 'constructors/BestFinishHistory';
  }
  else if(dataType == 'Grid') {
    url = url + 'constructors/BestStartHistory';
  }
  else {
    url = url + 'constructors/BestFastestLapHistory';
  }
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch(fetchConstructorComparisionSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchConstructorComparisionError(err));
      });
  }
}
