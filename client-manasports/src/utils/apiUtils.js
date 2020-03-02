// UTILS
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// This methods is responsible for handling the API response
export async function handleResponse(response) {

    if (response.ok) return response.json();

    if (response.status === 400) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = await response.text();
        throw new Error(error);
    }

    if (response.status === 401) {
        // Pass the pathname and  then to redirect
        localStorage.clear();
        
        // deleteToken();
        // history.push('/Login');

        throw new Error("Your session has expired. Please log in.");

    }

    if (response.status === 503) {
        throw new Error("Sorry we are doing some maintenance. Please check back soon.")
    }

    throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
}
