import { TAction } from '../actionTypes';
import { ITeam } from '../interfaces';


export const TournamentTeamsReducer = (
    state: ITeam[] = [],
    action: TAction
): ITeam[] => {
    if (action.type === "SET_LEAGUE_TEAMS") {
        return action.leagueTeams;
    }
    if (action.type === "PUT_TEAM") {
        const team = state;
        const index = state.findIndex(u => u.TeamId === action.TeamId);
        team[index] = action.team;
        return [...team];
    }
    // if (action.type === "NEW_LEAGUE") {
    //     const leagues = state;
    //     leagues.push(action.league)
        
    //     return [...leagues];
    // }

    return state;
};