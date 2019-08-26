import { TAction } from '../actionTypes';
import { IPlayer } from '../interfaces';


export const PlayerReducer = (
    state: IPlayer[] = [],
    action: TAction
): IPlayer[] => {
    if (action.type === "SET_TEAM_PLAYERS") {
        return action.teamPlayers;
    }
    if (action.type === "NEW_PLAYER") {
        const players = state;
        players.push(action.player)
        
        return [...players];
    }
    if (action.type === "PUT_PLAYER") {
        const player = state;
        const index = state.findIndex(u => u.PlayerId === action.PlayerId);
        player[index] = action.player;
        return [...player];
    }
    if (action.type === "DELETE_PLAYER") {
        const players = state;
        const index = state.findIndex(l => l.PlayerId === action.PlayerId);
        players.splice(index, 1);
        return [...players];
    }
    return state;
};