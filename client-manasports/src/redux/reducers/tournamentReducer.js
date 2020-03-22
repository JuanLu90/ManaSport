import * as types from '../actions/types/actionTypes';

const initialState = {
    tournaments: []
}

export default function tournamentReducer(state = initialState, action) {

    switch (action.type) {
        case types.TOURNAMENTS_BY_USER_REQUEST:
            return { ...state };
        case types.TOURNAMENTS_BY_USER_SUCCESS:
            return { ...state, tournaments: action.payload };
        case types.TOURNAMENTS_BY_USER_FAILURE:
            return { ...state };
        default:
            return state;
    }
};