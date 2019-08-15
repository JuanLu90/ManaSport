import { TAction } from '../actionTypes';
import { IMatch } from '../interfaces';


export const MatchsReducer = (
    state: IMatch[] = [],
    action: TAction
): IMatch[] => {
    if (action.type === "SET_MATCHS") {
        return action.matchs;
    }
    if (action.type === "PUT_MATCH") {
        const match = state;
        const index = state.findIndex(u => u.MatchId === action.MatchId);
        match[index] = action.match;
        return [...match];
    }
    // if (action.type === "NEW_LEAGUE") {
    //     const leagues = state;
    //     leagues.push(action.league)
        
    //     return [...leagues];
    // }
    // if (action.type === "DELETE_LEAGUE") {
    //     const leagues = state;
    //     const index = state.findIndex(l => l.TournamentId === action.LeagueId);
    //     leagues.splice(index, 1);
    //     return [...leagues];

    // }

    return state;
};