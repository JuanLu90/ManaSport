import { TAction } from '../actionTypes';
import { ITournament } from '../interfaces';


export const PlayoffsReducer = (
    state: ITournament[] = [],
    action: TAction
): ITournament[] => {
    if (action.type === "SET_PLAYOFFS") {
        return action.playoffs;
    }
    if (action.type === "NEW_PLAYOFF") {
        const playoffs = state;
        playoffs.push(action.playoff)
        
        return [...playoffs];
    }
    if (action.type === "PUT_PLAYOFF") {
        const playoff = state;
        const index = state.findIndex(u => u.TournamentId === action.PlayoffId);
        playoff[index] = action.playoff;
        return [...playoff];
    }
    if (action.type === "DELETE_PLAYOFF") {
        const playoffs = state;
        const index = state.findIndex(l => l.TournamentId === action.PlayoffId);
        playoffs.splice(index, 1);
        return [...playoffs];

    }

    return state;
};