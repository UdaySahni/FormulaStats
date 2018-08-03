import {FETCH_ACTIVE_RACES_SUCCESS, FETCH_ACTIVE_RACES_ERROR} from '../actions/fetch_actives_actions';

var _ = require('lodash');

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACTIVE_RACES_SUCCESS:
      var races = _.map(action.payload.data.MRData.RaceTable.Races, 'raceName');
      return races;
    case FETCH_ACTIVE_RACES_ERROR:
        return {
          activeConsturctorsError: action.payload
        };

    default:
      return state;
  }
}
