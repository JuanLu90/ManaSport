import { combineReducers } from "redux";
// import { tokenReducer } from "./tokenReducer";
import { IUser } from '../interfaces';
import { UsersReducer } from "./usersReducer";

export interface IGlobalState {
//   token: string;
  users: IUser[];
};

export const reducers = combineReducers<IGlobalState>({
//   token: tokenReducer,
  users: UsersReducer
});