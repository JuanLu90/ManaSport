//Types
import * as types from "../actions/types/userActionTypes";
//Utils
import { getUserLocalStorage, addUserLocalStorage } from '../../utils/localStorageUtils';


let user = getUserLocalStorage();

if (user && user.role !== 'Player') user = null;

const initialState = {
  user,
  role: user && user.role,
  loggedIn: user ? true : false,
  usernameAvailable: true,
  accountConfirmed: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // LOGIN
    case types.LOGIN_REQUEST:
      return { ...state, loggingIn: true };
    case types.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        role: action.payload.role,
        user: addUserLocalStorage(action.payload),
      };
    case types.LOGIN_FAILURE:
      return { loggingIn: false };
    // LOGOUT
    case types.LOGOUT:
      return { loggedIn: false, justLogout: true };
    // REGISTER
    case types.REGISTER_REQUEST:
      return { ...state, registering: true, completedRegister: false };
    case types.REGISTER_SUCCESS:
      return { ...state, registering: false, registered: true };
    case types.REGISTER_FAILURE:
      return { ...state, registering: false, registered: false };
    // FORGOT PASSWORD
    case types.FORGOT_PASSWORD_REQUEST:
      return { ...state, sending: true };
    case types.FORGOT_PASSWORD_SUCCESS:
      return { ...state, email: action.payload, sending: false }
    case types.FORGOT_PASSWORD_FAILURE:
      return { ...state };
    // CHANGE PASSWORD
    case types.CHANGE_PASSWORD_REQUEST:
      return { ...state, changing: true };
    case types.CHANGE_PASSWORD_SUCCESS:
      return { ...state, changing: false };
    case types.CHANGE_PASSWORD_FAILURE:
      return { ...state, changing: false };
    // RESET PASSWORD
    case types.RESET_PASSWORD_REQUEST:
      return { ...state, user: action.payload, sending: true }
    case types.RESET_PASSWORD_SUCCESS:
      return { ...state, user: action.payload, sending: false };
    case types.RESET_PASSWORD_FAILURE:
      return { ...state };
    // CHECK EMAIL
    case types.CHECK_EMAIL_REQUEST:
      return { ...state };
    case types.CHECK_EMAIL_SUCCESS:
      return { ...state, usernameAvailable: true };
    case types.CHECK_EMAIL_FAILURE:
      return { ...state, usernameAvailable: false }
    default:
      return state
  }
};