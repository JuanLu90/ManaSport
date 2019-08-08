import { TAction } from '../actionTypes';

export const SetTournamentsIdReducer = (
    state: number = -1,
    action: TAction
): number => {
    if (action.type === "SET_LEAGUEID") {
        return action.leagueId;
    }
    if (action.type === "SET_PLAYOFFID") {
        return action.playoffId;
    }
    if (action.type === "SET_TEAMID") {
        return action.TeamId;
    }
    return state;
};