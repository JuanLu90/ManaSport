import * as types from '../actions/types/actionTypes';

const initialState = {
    tournaments: [],
    qualification: [],
    matches: []
}

export default function tournamentReducer(state = initialState, action) {

    switch (action.type) {
        //TOURNAMENTS BY USER
        case types.TOURNAMENTS_BY_USER_REQUEST:
            return { ...state };
        case types.TOURNAMENTS_BY_USER_SUCCESS:
            return { ...state, tournaments: action.payload };
        case types.TOURNAMENTS_BY_USER_FAILURE:
            return { ...state };

        //QUALIFITATION TOURNAMENT
        case types.QUALIFITATION_TOURNAMENT_REQUEST:
            return { ...state };
        case types.QUALIFITATION_TOURNAMENT_SUCCESS:
            return { ...state, qualification: action.payload };
        case types.QUALIFITATION_TOURNAMENT_FAILURE:
            return { ...state };

        //MATCHES OF A TOURNAMENT
        case types.MATCHES_TOURNAMENT_REQUEST:
            return { ...state };
        case types.MATCHES_TOURNAMENT_SUCCESS:
            return { ...state, matches: action.payload };
        case types.MATCHES_TOURNAMENT_FAILURE:
            return { ...state };
        default:
            return state;
    }
};