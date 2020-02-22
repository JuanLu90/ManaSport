import { handleResponse, handleError } from '../utils/apiUtils';

export const userService = {
    login,
    logout,
    register
};


// LOGIN
async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return await fetch('api/auth/login', requestOptions).then(handleResponse, handleError);
};


async function logout() {
    localStorage.clear();
};

// REGISTER
async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };

    return await fetch('http://localhost:8080/api/users/newUser', requestOptions).then(handleResponse, handleError);
}