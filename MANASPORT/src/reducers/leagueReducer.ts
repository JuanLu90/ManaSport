import { TAction } from '../actionTypes';
import { ITournament } from '../interfaces';


export const LeaguesReducer = (
    state: ITournament[] = [],
    action: TAction
): ITournament[] => {
    if (action.type === "SET_LEAGUES") {
        return action.leagues;
    }
    if (action.type === "NEW_LEAGUE") {
        const leagues = state;
        leagues.push(action.league)
        
        return [...leagues];
    }
    if (action.type === "PUT_LEAGUE") {
        const league = state;
        const index = state.findIndex(u => u.TournamentId === action.LeagueId);
        league[index] = action.league;
        return [...league];
    }
    if (action.type === "DELETE_LEAGUE") {
        const leagues = state;
        const index = state.findIndex(l => l.TournamentId === action.LeagueId);
        leagues.splice(index, 1);
        return [...leagues];
    }

    return state;
};