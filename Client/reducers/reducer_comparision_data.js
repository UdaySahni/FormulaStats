import { FETCH_DRIVER_COMPARISION_SUCCESS, FETCH_DRIVER_COMPARISION_ERROR, FETCH_CONSTRUCTOR_COMPARISION_SUCCESS, FETCH_CONSTRUCTOR_COMPARISION_ERROR } from '../actions/compare_actions.js';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_DRIVER_COMPARISION_SUCCESS:
      return {
        data: action.payload.data
      };
    case FETCH_DRIVER_COMPARISION_ERROR:
      return {
        comparisionError: action.payload
      };
    case FETCH_CONSTRUCTOR_COMPARISION_SUCCESS:
      return {
        data: action.payload.data
      };
    case FETCH_CONSTRUCTOR_COMPARISION_ERROR:
      return {
        comparisionError: action.payload
      };
    default:
      return state;
  }
}
