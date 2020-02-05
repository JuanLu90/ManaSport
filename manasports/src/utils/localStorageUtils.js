//UTILS
import { decryptMessage, encryptMessage } from "./cryptoUtils";

//#region Functions

export function addUserLocalStorage(user) {
    if (user && user.token) {
        setItemEncryptedToLocalStorage('user', user);
    }
    return user;
};

export function getUserLocalStorage() {

    let user = getItemDecryptedFromLocalStorage('user');

    if (user) return user;

    else return null;
};


export function setItemEncryptedToLocalStorage(itemName,item) {
  
    let toEncryptItem = null;
    if (item !== null && item !== undefined && itemName !== null && itemName !== undefined) {

        try {
            toEncryptItem = JSON.stringify(item);
        } catch (e) {
            toEncryptItem = item;
        }
        localStorage.setItem(itemName, encryptMessage(toEncryptItem));
    }

}

export function getItemDecryptedFromLocalStorage(itemName) {
    let result = null
    if (localStorage.getItem(itemName) !== null) {
        let decryptedItem = decryptMessage(localStorage.getItem(itemName));
        try {
            result = JSON.parse(decryptedItem);
        } catch (e) {
            result = decryptedItem;
        }
    }
    return result;
}

//#endregion Functions