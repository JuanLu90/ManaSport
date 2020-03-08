//UTILS
// import { decryptMessage, encryptMessage } from "./cryptoUtils";

//#region Functions

export function addUserLocalStorage(user) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
};

export function getUserLocalStorage() {

       let userLocalStorage = JSON.parse(localStorage.getItem('user'));
    
    return userLocalStorage;
};

// export function changeOddsFormatLocalStorage(format) {
   
//     let user = getItemDecryptedFromLocalStorage('user');

//     if (user && user.settings) {

//         user.settings.oddsFormat = Number(format);

//         setItemEncryptedToLocalStorage('user',user); 

//         return Number(format);

//     } else return Number(format);
// };

// export function getOddsFormatLocalStorage() {
    
//     let user = getItemDecryptedFromLocalStorage('user');
//     if (user && user.settings) return user.settings.oddsFormat;
//     else return 0;
// };

// export function getUserLocalStorage() {

//     let user = getItemDecryptedFromLocalStorage('user');

//     if (user) return user;

//     else return null;
// };


// export function setItemEncryptedToLocalStorage(itemName,item) {
  
//     let toEncryptItem = null;
//     if (item !== null && item !== undefined && itemName !== null && itemName !== undefined) {

//         try {
//             toEncryptItem = JSON.stringify(item);
//         } catch (e) {
//             toEncryptItem = item;
//         }
//         localStorage.setItem(itemName, encryptMessage(toEncryptItem));
//     }

// }

// export function getItemDecryptedFromLocalStorage(itemName) {
//     let result = null;
//     if (localStorage.getItem(itemName) !== null) {
//         let decryptedItem = decryptMessage(localStorage.getItem(itemName));
//         try {
//             result = JSON.parse(decryptedItem);
//         } catch (e) {
//             result = decryptedItem;
//         }
//     }
//     return result;
// }

//#endregion Functions