import {FETCH_ACTIVE_CONSTRUCTORS_SUCCESS, FETCH_ACTIVE_CONSTRUCTORS_ERROR} from '../actions/fetch_actives_actions';

var _ = require('lodash');

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACTIVE_CONSTRUCTORS_SUCCESS:
      var constructors = _.map(action.payload.data.MRData.ConstructorTable.Constructors, function(object) {
        return _.pick(object, ['constructorId', 'name']);
      });
      var constructorsMap = _.keyBy(constructors, 'name');
      return constructorsMap;

    case FETCH_ACTIVE_CONSTRUCTORS_ERROR:
        return {
          activeConsturctorsError: action.payload
        };

    default:
      return state;
  }
}
