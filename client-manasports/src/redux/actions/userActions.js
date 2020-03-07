// SERVICE
import { userService } from '../../services/userService';
// TYPES
import * as types from './types/actionTypes';

export function registerAction(user) {
    return async dispatch => {
        await userService.register(user)
            .then(response => {
                dispatch(success(user));
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // function request() { return { type: types.REGISTER_REQUEST } }
    function success(user) { return { type: types.REGISTER_SUCCESS, user } }
    // function failure(error) { return { type: types.REGISTER_FAILURE, error } }
};

export function loginAction(user) {
    return async dispatch => {
        dispatch(request());
        await userService.login(user)
            .then(response => {

                let userWIthToken = {
                    ...user,
                    token: response
                }

                dispatch(success(userWIthToken));
            })
            .catch(error => {
                dispatch(failure());
                console.log(error);
            });
    }

    function request() { return { type: types.LOGIN_REQUEST } }
    function success(user) { return { type: types.LOGIN_SUCCESS, user } }
    function failure() { return { type: types.LOGIN_FAILURE } }
};