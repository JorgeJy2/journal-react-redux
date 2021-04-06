import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/auth"
                    component={AuthRouter}>
                </Route>
                <Route
                    exact
                    path="/"
                    component={JournalScreen}>
                </Route>
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
