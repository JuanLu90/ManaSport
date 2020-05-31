import * as types from '../actions/types/actionTypes';

const initialState = {
    tournaments: [],
    qualification: [],
    matches: [],
    teams: []
}

export default function tournamentReducer(
    state: any = initialState,
    action: any
): any {
    switch (action.type) {
        // Tournament`s user
        case types.TOURNAMENTS_BY_USER_REQUEST:
            return { ...state };
        case types.TOURNAMENTS_BY_USER_SUCCESS:
            return { ...state, tournaments: action.payload };
        case types.TOURNAMENTS_BY_USER_FAILURE:
            return { ...state };

        // New tournament
        case types.NEW_TOURNAMENT_REQUEST:
            return { ...state };
        case types.NEW_TOURNAMENT_SUCCESS:
            return { ...state };
        case types.NEW_TOURNAMENT_FAILURE:
            return { ...state };

        // New team
        case types.NEW_TEAM_REQUEST:
            return { ...state };
        case types.NEW_TEAM_SUCCESS:
            return { ...state, teams: [...state.teams, action.payload] };
        case types.NEW_TEAM_FAILURE:
            return { ...state };

        // Delete a tournament
        case types.DELETE_TOURNAMENT_REQUEST:
            return { ...state };
        case types.DELETE_TOURNAMENT_SUCCESS:
            const tournamentsUpdated = state.tournaments.filter((tournament: any) => tournament.Id !== action.payload);
            return { ...state, tournaments: tournamentsUpdated };
        case types.DELETE_TOURNAMENT_FAILURE:
            return { ...state };

        // Tournament`s teams
        case types.TEAMS_TOURNAMENT_REQUEST:
            return { ...state };
        case types.TEAMS_TOURNAMENT_SUCCESS:
            return { ...state, teams: action.payload };
        case types.TEAMS_TOURNAMENT_FAILURE:
            return { ...state };

        // Delete a team
        case types.DELETE_TEAM_REQUEST:
            return { ...state };
        case types.DELETE_TEAM_SUCCESS:
            const teamsUpdated = state.teams.filter((team: any) => team.Id !== action.payload);
            return { ...state, teams: teamsUpdated };
        case types.DELETE_TEAM_FAILURE:
            return { ...state };

        // Tournament`s qualification
        case types.QUALIFITATION_TOURNAMENT_REQUEST:
            return { ...state };
        case types.QUALIFITATION_TOURNAMENT_SUCCESS:
            return { ...state, qualification: action.payload };
        case types.QUALIFITATION_TOURNAMENT_FAILURE:
            return { ...state };

        // Tournament´s matches
        case types.MATCHES_TOURNAMENT_REQUEST:
            return { ...state };
        case types.MATCHES_TOURNAMENT_SUCCESS:
            return { ...state, matches: action.payload };
        case types.MATCHES_TOURNAMENT_FAILURE:
            return { ...state };

        // Update a match of the tournament
        case types.EDIT_MATCH_TOURNAMENT_REQUEST:
            return { ...state };
        case types.EDIT_MATCH_TOURNAMENT_SUCCESS:
            return { ...state, matchUpdated: action.payload };
        case types.EDIT_MATCH_TOURNAMENT_FAILURE:
            return { ...state };
        default:
            return state;
    }
};