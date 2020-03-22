// UTILS
import { handleResponse, handleError } from "../utils/apiUtils";

export const tournamentService = {
    tournamentsByUser
};

async function tournamentsByUser(userId) {

    const requestOptions = {
        method: 'GET'
    };

    return await fetch(`http://localhost:8080/api/tournaments/${userId}`, requestOptions).then(handleResponse, handleError);
}
