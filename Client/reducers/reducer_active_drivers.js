import {FETCH_ACTIVE_DRIVERS_SUCCESS, FETCH_ACTIVE_DRIVERS_ERROR} from '../actions/fetch_actives_actions';

var _ = require('lodash');

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACTIVE_DRIVERS_SUCCESS:
      var drivers = _.map(action.payload.data.MRData.DriverTable.Drivers, function(object) {
        return _.pick(object, ['driverId', 'familyName']);
      });
      var driversMap = _.keyBy(drivers, 'familyName');
      return driversMap;

    case FETCH_ACTIVE_DRIVERS_ERROR:
        return {
          activeDriversError: action.payload
        };

    default: // need this for default case
      return state;
  }
  return state;
}
