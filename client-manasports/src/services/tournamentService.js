// UTILS
import { handleResponse, handleError } from "../utils/apiUtil";

export const tournamentService = {
    tournamentsByUser,
    qualificationTournament,
    matchesTournament,
    newTournament,
    deleteTournament,
    matchTournamentEdit,
    teamsTournament,
    newTeam
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

// Delete a tournament
async function deleteTournament(tournamentId) {
    const requestOptions = {
        method: 'DELETE'
    }
    return await fetch(`http://localhost:8080/api/tournaments/deleteTournament/${tournamentId}`, requestOptions).then(handleResponse, handleError);
}

// Get tournament´s teams
async function teamsTournament(tournamentId) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/teams/${tournamentId}`, requestOptions).then(handleResponse, handleError);
}

// Create a new team
async function newTeam(data) {
    const requestOptions = {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    }
    return await fetch("http://localhost:8080/api/tournaments/newTeam", requestOptions).then(handleResponse, handleError);
}

// Get tournament´s qualification
async function qualificationTournament(tournamentId) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/qualification/${tournamentId}`, requestOptions).then(handleResponse, handleError);
}

// Get tournament´s matches
async function matchesTournament(tournamentId, matchday) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/matches/${tournamentId}/${matchday}`, requestOptions).then(handleResponse, handleError);
}

// Update a tournament´s match
async function matchTournamentEdit(data) {
    const requestOptions = {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    };
    return await fetch("http://localhost:8080/api/tournaments/matches/editMatch", requestOptions).then(handleResponse, handleError);
}

