import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tournamentReducer from "./tournamentReducer";

export interface IGlobalState {
  users: any;
  tournaments: any;
  userReducer: any;
};

export const reducers = combineReducers<IGlobalState>({
  users: userReducer,
  tournaments: tournamentReducer,
  userReducer: userReducer
});