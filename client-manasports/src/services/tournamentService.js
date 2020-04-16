// UTILS
import { handleResponse, handleError } from "../utils/apiUtils";

export const tournamentService = {
    tournamentsByUser,
    qualificationTournament,
    matchesTournament,
    newTournament,
    matchTournamentEdit, 
};

// Get all tournaments of current user 
async function tournamentsByUser(userId) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/${userId}`, requestOptions).then(handleResponse, handleError);
}

// Create a new tournament
async function newTournament(data) {
    const requestOptions = {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    }
    return await fetch("http://localhost:8080/api/tournaments/newTournament", requestOptions).then(handleResponse, handleError);
}

// Get qualification of tournament selected
async function qualificationTournament(tournamentId) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/qualification/${tournamentId}`, requestOptions).then(handleResponse, handleError);
}

// Get matches of tournament selected
async function matchesTournament(tournamentId, matchday) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/matches/${tournamentId}/${matchday}`, requestOptions).then(handleResponse, handleError);
}

// Update a match of the tournament selected
async function matchTournamentEdit(data) {
    const requestOptions = {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    };
    return await fetch("http://localhost:8080/api/tournaments/matches/editMatch", requestOptions).then(handleResponse, handleError);
}

