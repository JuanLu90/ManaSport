// TYPES
import * as types from './types/userActionTypes';

// SERVICES
import { userService } from '../../services/userService';

// ACTIONS
import { apiStatusActions } from './apiStatusActions';

// LOG IN
export function loginAction(username, password) {
    return async function (dispatch) {
        dispatch(apiStatusActions.apiCallRequest());
        dispatch(request());

        await userService.login(username, password)
            .then(response => {
                dispatch(apiStatusActions.apiCallSuccess());
                if(!response.ageVerification){
                    // dispatch(history.push('/CheckAge'));
                }
                else{
                    dispatch(success(response));
                    localStorage.removeItem('addressAPI');  // DELETE APIKEY OF POSTCODES
                }
            })
            .catch(error => {
                dispatch(failure());
                dispatch(apiStatusActions.apiCallError());
                // dispatch(alertActions.errorAlertAction(error));
                throw error;
            });
    };

    function request() { return { type: types.LOGIN_REQUEST } }
    function success(payload) { return { type: types.LOGIN_SUCCESS, payload } }
    function failure() { return { type: types.LOGIN_FAILURE } }
};

// LOG OUT
export function logOutAction() {
    userService.logout();
    // history.push("/Login");
    return { type: types.LOGOUT }
};

// REGISTER
// export function registerAction(user) {
//     debugger;
//     return async dispatch => {
//         dispatch(request());

//         await userService.register(user)
//             .then(response => {
//                 console.log(response)
//                 dispatch(success(user));
//             })
//             .catch(error => {
//                 dispatch(failure(error));
//             });
//     };

//     function request() { return { type: types.REGISTER_REQUEST } }
//     function success(payload) { return { type: types.REGISTER_SUCCESS, payload } }
//     function failure(error) { return { type: types.REGISTER_FAILURE, error } }
// };

export function registerAction(user) {
    fetch("http://localhost:8080/api/users/newUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            // Authorization: "Bearer " + token
        },
        body: JSON.stringify(user)
    });
}

