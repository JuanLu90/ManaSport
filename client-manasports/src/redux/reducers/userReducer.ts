import * as types from '../actions/types/actionTypes';
import { addUserLocalStorage, getUserLocalStorage } from '../../utils/localStorageUtils';
import jwt from "jsonwebtoken";

const initialState = {
    user: {}
}

export default function userReducer(
    state: any = initialState,
    action: any
): any {
    switch (action.type) {
        //REGISTER
        case types.REGISTER_REQUEST:
            return { ...state };
        case types.REGISTER_SUCCESS:
            return { ...state, user: action.payload };
        case types.REGISTER_FAILURE:
            return { ...state };
        //LOGIN
        case types.LOGIN_REQUEST:
            return { ...state, loggingIn: true };
        case types.LOGIN_SUCCESS:
            const tokenDecoded = jwt.decode(action.payload);
            console.log(tokenDecoded)
            return {
                ...state,
                user: addUserLocalStorage(tokenDecoded),
                loggingIn: false
            };
        case types.LOGIN_FAILURE:
            return { ...state, loggingIn: false };
        case types.GET_USER_LOCALSTORAGE:
            return {
                ...state,
                user: getUserLocalStorage(),
            };
        default:
            return state;
    }
};