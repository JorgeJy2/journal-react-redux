import Swal from 'sweetalert2';
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./ui";




export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                const { displayName, uid } = user;
                dispatch(login(uid, displayName));
            })
            .catch(error =>{
                Swal.fire(error.code, error.message, 'error');
            })
            .finally(() => dispatch(finishLoading()));
    };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                console.log(user);
                await user.updateProfile({ displayName: name });

                console.log(user);
                dispatch(login(user.uid, user.displayName));
            })
            .catch(error =>{
                Swal.fire(error.code, error.message, 'error');
            })
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                // console.log(userCredentials);
                // console.log(userCredentials.user);
                // console.log(userCredentials.user.displayName);
                // console.log(userCredentials.user.uid);       
                const { displayName, uid } = user;
                dispatch(login(uid, displayName));
            })
            .catch(console.error);
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
    }
}

export const logout = () =>({
    type: types.logout
});
