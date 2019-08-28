import { TAction } from '../actionTypes';
import { ITournament } from '../interfaces';


export const AllLeaguesReducer = (
    state: ITournament[] = [],
    action: TAction
): ITournament[] => {
    if (action.type === "SET_ALLLEAGUES") {
        return action.allleagues;
    }
    return state;
};