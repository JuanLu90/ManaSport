// Service
import { tournamentService } from '../../services/tournamentService';

// Types
import * as types from './types/actionTypes';


// Get all tournaments of current user 
export const tournamentsByUserAction = (userId) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.tournamentsByUser(userId)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.TOURNAMENTS_BY_USER_REQUEST } }
    function success(payload) { return { type: types.TOURNAMENTS_BY_USER_SUCCESS, payload } }
    function failure(error) { return { type: types.TOURNAMENTS_BY_USER_FAILURE, error } }
};

// Create a new tournament
export const newTournamentAction = (data) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.newTournament(data)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.NEW_TOURNAMENT_REQUEST } }
    function success(payload) { return { type: types.NEW_TOURNAMENT_SUCCESS, payload } }
    function failure(error) { return { type: types.NEW_TOURNAMENT_FAILURE, error } }
};

// Create a new team
export const newTeamAction = (data) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.newTeam(data)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.NEW_TEAM_REQUEST } }
    function success(payload) { return { type: types.NEW_TEAM_SUCCESS, payload } }
    function failure(error) { return { type: types.NEW_TEAM_FAILURE, error } }
};

// Get tournament´s matches
export const teamsTournamentAction = (tournamentId) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.teamsTournament(tournamentId)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.TEAMS_TOURNAMENT_REQUEST } }
    function success(payload) { return { type: types.TEAMS_TOURNAMENT_SUCCESS, payload } }
    function failure(error) { return { type: types.TEAMS_TOURNAMENT_FAILURE, error } }
};

// Delete a tournament
export const deleteTournamentAction = (tournamentId) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.deleteTournament(tournamentId)
            .then(response => {
                dispatch(success(tournamentId));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.DELETE_TOURNAMENT_REQUEST } }
    function success(payload) { return { type: types.DELETE_TOURNAMENT_SUCCESS, payload } }
    function failure(error) { return { type: types.DELETE_TOURNAMENT_FAILURE, error } }
};

// Get tournament´s qualification
export const qualificationTournamentAction = (tournamentId) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.qualificationTournament(tournamentId)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.QUALIFITATION_TOURNAMENT_REQUEST } }
    function success(payload) { return { type: types.QUALIFITATION_TOURNAMENT_SUCCESS, payload } }
    function failure(error) { return { type: types.QUALIFITATION_TOURNAMENT_FAILURE, error } }
};

// Get tournament´s matches
export const matchesTournamentAction = (tournamentId, matchday) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.matchesTournament(tournamentId, matchday)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.MATCHES_TOURNAMENT_REQUEST } }
    function success(payload) { return { type: types.MATCHES_TOURNAMENT_SUCCESS, payload } }
    function failure(error) { return { type: types.MATCHES_TOURNAMENT_FAILURE, error } }
};

// Update a match of the tournament selected
export const matchTournamentEditAction = (data) => {
    return async dispatch => {
        dispatch(request());
        await tournamentService.matchTournamentEdit(data)
            .then(response => {
                dispatch(success(JSON.parse(response)));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }
    function request() { return { type: types.EDIT_MATCH_TOURNAMENT_REQUEST } }
    function success(payload) { return { type: types.EDIT_MATCH_TOURNAMENT_SUCCESS, payload } }
    function failure(error) { return { type: types.EDIT_MATCH_TOURNAMENT_FAILURE, error } }
};