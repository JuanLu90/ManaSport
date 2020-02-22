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
    default:
      return state
  }
};