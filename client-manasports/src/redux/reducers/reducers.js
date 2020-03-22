import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tournamentReducer from "./tournamentReducer";

export const reducers = combineReducers({
  users: userReducer,
  tournaments: tournamentReducer
});