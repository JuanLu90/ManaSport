import { TAction } from '../actionTypes';
import { ITeam } from '../interfaces';


export const TournamentTeamsReducer = (
    state: ITeam[] = [],
    action: TAction
): ITeam[] => {
    if (action.type === "SET_LEAGUE_TEAMS") {
        return action.leagueTeams;
    }
    if (action.type === "NEW_TEAM") {
        const teams = state;
        teams.push(action.team)
        
        return [...teams];
    }
    if (action.type === "DELETE_TEAM") {
        const teams = state;
        const index = state.findIndex(l => l.TeamId === action.TeamId);
        teams.splice(index, 1);
        return [...teams];
    }
    if (action.type === "PUT_TEAM") {
        const team = state;
        const index = state.findIndex(u => u.TeamId === action.TeamId);
        team[index] = action.team;
        return [...team];
    }
    return state;
};