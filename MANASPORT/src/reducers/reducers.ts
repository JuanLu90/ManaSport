import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { IUser, ITournament, ITeam, IMatch, IPlayer } from "../interfaces";
import { UsersReducer } from "./usersReducer";
import { LeaguesReducer } from './leagueReducer';
import { PlayoffsReducer } from './playoffReducer';
import { SetTournamentsIdReducer } from "./setTournamentsIdReducer";
import { TournamentTeamsReducer } from "./tournamentTeamsReducer";
import { MatchsReducer } from "./matchReducer";
import { PlayerReducer } from "./playerReducer";

export interface IGlobalState {
  token: string;
  users: IUser[];
  leagues: ITournament[];
  playoffs: ITournament[];
  TournamentId: number;
  leagueTeams: ITeam[];
  matchs: IMatch[];
  teamPlayers: IPlayer[];
};

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  users: UsersReducer,
  leagues: LeaguesReducer,
  playoffs: PlayoffsReducer,
  TournamentId: SetTournamentsIdReducer,
  leagueTeams: TournamentTeamsReducer,
  matchs: MatchsReducer,
  teamPlayers: PlayerReducer
});