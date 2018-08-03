import { combineReducers } from 'redux';
import ActiveDriverReducer from './reducer_active_drivers';
import ActiveConstructorsReducer from './reducer_active_constructors';
import ActiveRacesReducer from './reducer_active_races';
import AuthReducer from './reducer_auth';
import CurrentRaceReducer from './reducer_current_race';
import ComparisionReducer from './reducer_comparision_data';
import UserDataReducer from './reducer_user_data';

const rootReducer = combineReducers({
  activeDrivers: ActiveDriverReducer,
  activeConstructors: ActiveConstructorsReducer,
  activeRaces: ActiveRacesReducer,
  auth: AuthReducer,
  currentRace: CurrentRaceReducer,
  comparision: ComparisionReducer,
  userData: UserDataReducer
});

export default rootReducer;
