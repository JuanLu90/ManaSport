import { TAction } from '../actionTypes';

export const tokenReducer = (
    state: string = "",
    action: TAction
): string => {
    if (action.type === "SET_TOKEN") {
        return action.token;
    }
    return state;
};