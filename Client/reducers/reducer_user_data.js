import {FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_ERROR, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_ERROR} from '../actions/user_data_actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return action.payload.data;
    case FETCH_USER_DATA_ERROR:
      return {
        userDataError: action.payload
      };
    case UPDATE_USER_DATA_SUCCESS:
      return action.payload.data;
    case UPDATE_USER_DATA_ERROR:
      return {
        userDataError: action.payload
      };
    default:
      return state;
  }
}
