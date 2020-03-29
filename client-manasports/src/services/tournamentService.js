// UTILS
import { handleResponse, handleError } from "../utils/apiUtils";

export const tournamentService = {
    tournamentsByUser,
    qualificationTournament,
    matchesTournament
};

async function tournamentsByUser(userId) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/${userId}`, requestOptions).then(handleResponse, handleError);
}


async function qualificationTournament(tournamentId) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/qualification/${tournamentId}`, requestOptions).then(handleResponse, handleError);
}


async function matchesTournament(tournamentId, matchday) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(`http://localhost:8080/api/tournaments/matches/${tournamentId}/${matchday}`, requestOptions).then(handleResponse, handleError);
}

