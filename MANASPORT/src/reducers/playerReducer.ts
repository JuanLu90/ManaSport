import { TAction } from '../actionTypes';
import { IPlayer } from '../interfaces';


export const PlayerReducer = (
    state: IPlayer[] = [],
    action: TAction
): IPlayer[] => {
    if (action.type === "SET_TEAM_PLAYERS") {
        return action.teamPlayers;
    }
    if (action.type === "PUT_PLAYER") {
        const player = state;
        const index = state.findIndex(u => u.PlayerId === action.PlayerId);
        player[index] = action.player;
        return [...player];
    }
    return state;
};