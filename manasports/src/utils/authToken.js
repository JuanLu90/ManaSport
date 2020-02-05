
// export const checkToken = () => {
//     let token = getItemDecryptedFromLocalStorage('user');
//     if (token) {
//         return token;
//     } else {
//         return null;
//     }
// };

// export const deleteToken = () => {
//     let token =  getItemDecryptedFromLocalStorage('user');
//     if (token) {
//         localStorage.removeItem('user');;
//     } else {
//         return null;
//     }
// };

// export const authHeader = () => {
//     let user = getItemDecryptedFromLocalStorage('user');
//     if (user && user.token) {
//         return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token };
//     } else {
//         return { 'Content-Type': 'application/json' };
//     }
// };