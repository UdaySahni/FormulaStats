import {FETCH_CURRENT_RACE} from '../actions/current_race_actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CURRENT_RACE:
      return action.payload.data;
    default:
      return state;
  }
}
