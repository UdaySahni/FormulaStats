import {REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGOUT} from '../actions/auth_actions';

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        jwt: action.payload.data.token,
      };
    case REGISTER_USER_ERROR:
      return {
        registrationError: action.payload
      };
    case LOGIN_USER_SUCCESS:
      return {
        jwt: action.payload.data.token,
      }
    case LOGIN_USER_ERROR:
      return {
        loginError: action.payload
      };
    case LOGOUT:
      return {};
    default: // need this for default case
      return state;
  }
  return state;
}
