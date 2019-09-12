import { firebase, googleAuthProvider } from '../firebase/firebase';

//Action Generator Function 
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider); //its render a dialogue box when you click on Login Button where you can select any of your google account and in login with it
    };
};

//Action Generator Function 
export const logout = () => ({
    type: 'LOGOUT'    
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};