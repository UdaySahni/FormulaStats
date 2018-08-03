import axios from 'axios';

const ACTIVE_DRIVERS_URL = "http://ergast.com/api/f1/current/drivers.json";
const ACTIVE_CONSTRUCTORS_URL = "http://ergast.com/api/f1/current/constructors.json";
const ACTIVE_RACES_URL = "http://ergast.com/api/f1/current/races.json";

export const FETCH_ACTIVE_DRIVERS_SUCCESS = 'FETCH_ACTIVE_DRIVERS_SUCCESS';
export const FETCH_ACTIVE_DRIVERS_ERROR = 'FETCH_ACTIVE_DRIVERS_ERROR';

export const FETCH_ACTIVE_CONSTRUCTORS_SUCCESS = 'FETCH_ACTIVE_CONSTRUCTORS_SUCCESS';
export const FETCH_ACTIVE_CONSTRUCTORS_ERROR = 'FETCH_ACTIVE_CONSTRUCTORS_ERROR';

export const FETCH_ACTIVE_RACES_SUCCESS = 'FETCH_ACTIVE_RACES_SUCCESS';
export const FETCH_ACTIVE_RACES_ERROR = 'FETCH_ACTIVE_RACES_ERROR';

function fetchActiveDriversSuccess(response) {
  return {
    type: FETCH_ACTIVE_DRIVERS_SUCCESS,
    payload: response
  };
}

function fetchActiveDriversError(err) {
  return {
    type: FETCH_ACTIVE_DRIVERS_ERROR,
    payload: err.response.data
  };
}

export function fetchActiveDrivers() {
  return function(dispatch) {
    axios.get(ACTIVE_DRIVERS_URL)
      .then((response) => {
        dispatch(fetchActiveDriversSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchActiveDriversError(err))
      });
  };
}

function fetchActiveConstructorsSuccess(response) {
  return {
    type: FETCH_ACTIVE_CONSTRUCTORS_SUCCESS,
    payload: response
  };
}

function fetchActiveConstructorsError(err) {
  return {
    type: FETCH_ACTIVE_CONSTRUCTORS_ERROR,
    payload: err.response.data
  };
}

export function fetchActiveConstructors() {
  return function(dispatch) {
    axios.get(ACTIVE_CONSTRUCTORS_URL)
      .then((response) => {
        dispatch(fetchActiveConstructorsSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchActiveConstructorsError(err))
      });
  };
}

function fetchActiveRacesSuccess(response) {
  return {
    type: FETCH_ACTIVE_RACES_SUCCESS,
    payload: response
  };
}

function fetchActiveRacesError(err) {
  return {
    type: FETCH_ACTIVE_RACES_ERROR,
    payload: err.response.data
  };
}

export function fetchActiveRaces() {
  return function(dispatch) {
    axios.get(ACTIVE_RACES_URL)
      .then((response) => {
        dispatch(fetchActiveRacesSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchActiveRacesError(err))
      });
  };
}
