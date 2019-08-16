import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { IUser, ITournament, ITeam, IMatch, IPlayer, IQualification } from '../interfaces';
import { UsersReducer } from "./usersReducer";
import { LeaguesReducer } from './leagueReducer';
import { SetTournamentsIdReducer } from "./setTournamentsIdReducer";
import { TournamentTeamsReducer } from "./tournamentTeamsReducer";
import { MatchsReducer } from "./matchReducer";
import { PlayerReducer } from "./playerReducer";
import { QualificationReducer } from "./qualificationReducer";

export interface IGlobalState {
  token: string;
  users: IUser[];
  leagues: ITournament[];
  teams: ITeam[];
  TournamentId: number;
  TeamId: number;
  MatchId: number;
  leagueTeams: ITeam[];
  matchs: IMatch[];
  teamPlayers: IPlayer[];
  qualification: IQualification[];
};

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  users: UsersReducer,
  leagues: LeaguesReducer,
  TournamentId: SetTournamentsIdReducer,
  TeamId: SetTournamentsIdReducer,
  leagueTeams: TournamentTeamsReducer,
  matchs: MatchsReducer,
  teamPlayers: PlayerReducer,
  qualification: QualificationReducer,
  teams: TournamentTeamsReducer,
  MatchId: SetTournamentsIdReducer
});