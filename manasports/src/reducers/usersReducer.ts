import { TAction } from '../actionTypes';
import { IUser } from '../interfaces';


export const UsersReducer = (
    state: IUser[] = [],
    action: TAction
): IUser[] => {
    if (action.type === "SET_USERS") {
        return action.users;
    }

    if (action.type === "PUT_USER") {
        const user = state;
        const index = state.findIndex(u => u.UserId === action.UserId);
        user[index] = action.user;
        return [...user];
    }

    // if (action.type === "UPDATE_USER") {
    //     const users = state;
    //     const index = state.findIndex(u => u._id === action.user_id);
    //     users[index].country = action.user.country;
    //     users[index].name = action.user.name;
    //     users[index].surname = action.user.surname;
    //     users[index].bornDate = action.user.bornDate;
    //     users[index].address = action.user.address;
    //     return [...users];

    // }

    // if (action.type === "DELETE_USER") {
    //     const users = state;
    //     const index = state.findIndex(u => u._id === action.user_id);
    //     users.splice(index, 1);
    //     return [...users];

    // }



    // if (action.type === "NEW_USER") {
    //     const users = state;
    //     users.push(action.users)

    //     return [...users];
    // }

    return state;
};