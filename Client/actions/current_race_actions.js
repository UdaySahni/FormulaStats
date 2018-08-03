import axios from 'axios';
import urls from '../constants/Urls'

//const BACKEND_URL = "http://192.168.43.166:1337/";
const BACKEND_URL = urls.backendUrl;

export const FETCH_CURRENT_RACE = 'FETCH_CURRENT_RACE';

export function fetchCurrentRace(bearerToken) {
  var config = {
    headers: {'Authorization': "bearer " + bearerToken}
  };
  const request = axios.get(BACKEND_URL+ "races/currentRace", config);
  return {
    type: FETCH_CURRENT_RACE,
    payload: request
  };
}
