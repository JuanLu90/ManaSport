import { combineReducers } from "redux";
import userReducer from "./userReducer";

export const reducers = combineReducers({
  users: userReducer
});