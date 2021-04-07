import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggeIn, setIsLoggeIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(
            (user) => {
                console.log(user);
                if (user?.uid) {
                    dispatch(login(user.uid, user.displayName));
                    setIsLoggeIn(true);
                } else {
                    setIsLoggeIn(false);
                }
                setChecking(false);
            }
        )
    }, [dispatch, setChecking, setIsLoggeIn]);

    if (checking) {
        return (<p>Waiting . . .</p>)
    }

    return (
        <Router>
            <Switch>
                <PublicRoute
                    isAuthenticated={isLoggeIn}
                    path="/auth"
                    component={AuthRouter}>
                </PublicRoute>
                <PrivateRoute isAuthenticated={isLoggeIn}
                    path='/'
                    component={JournalScreen} />
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
