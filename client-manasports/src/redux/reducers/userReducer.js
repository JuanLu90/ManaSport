import * as types from '../actions/types/actionTypes';
import { addUserLocalStorage } from '../../utils/localStorageUtils';

const initialState = {
    user: {}
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        //REGISTER
        case types.REGISTER_REQUEST:
            return { ...state};
        case types.REGISTER_SUCCESS:
            return { ...state, user: action.user };
        case types.REGISTER_FAILURE:
            return { ...state };
        //LOGIN
        case types.LOGIN_REQUEST:
            return { ...state, loggingIn: true };
        case types.LOGIN_SUCCESS:
            return { ...state, 
                user: addUserLocalStorage(action.user),
                loggingIn: false, 
                isLogged: true };
        case types.LOGIN_FAILURE:
            return { ...state, loggingIn: false, isLogged: false };
        default:
            return state;
    }
};