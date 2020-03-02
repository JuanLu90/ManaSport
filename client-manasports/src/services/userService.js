// UTILS
import { handleResponse, handleError } from '../utils/apiUtils';

// EXPORTED OBJECT, you could access to with the class descriptor like userService.<FunctionName>.
// For example: userService.logout()
export const userService = {
    register
};


async function register(user) {
    console.log(user)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' },
        body: JSON.stringify(user)
    };

    return await fetch('http://localhost:8080/api/users/newUser', requestOptions).then(handleResponse, handleError);
}
