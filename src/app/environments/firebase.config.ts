import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyAjWPU9zOoGyWEn4V2BgxdebI6ldAavGDM",
    authDomain: "nevibivalici.firebaseapp.com",
    databaseURL: "https://nevibivalici.firebaseio.com",
    storageBucket: "nevibivalici.appspot.com",
    messagingSenderId: "630589505904"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password

};