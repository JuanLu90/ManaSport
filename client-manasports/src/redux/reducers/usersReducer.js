import * as types from '../actions/types/actionTypes';

const initialState = {
    dePrueba: false,
    users: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_REQUEST:
            return { ...state, dePrueba: true };
        case types.REGISTER_SUCCESS:
            return { ...state, users: action.user, dePrueba: false };
        case types.REGISTER_FAILURE:
            return { ...state, dePrueba: false };
        default:
            return state;
    }
};