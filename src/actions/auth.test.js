/** * @jest-environment node */

import { login, logout, startLoginWithEmailPassword, startLogout } from "./auth";
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { types } from '../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {};

let store = mockStore(initState);

describe('test in aut', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should dispatch login action', () => {
        store.dispatch(login('uiTest', 'jorge'));
        const action = store.getActions()[0];
        expect(action).toEqual({
            type: types.login,
            payload: { uid: 'uiTest', displayName: 'jorge' }
        }
        );
    });

    test('should dispatch logout', () => {
        store.dispatch(login('uiTest', 'jorge'));
        const actionLogin = store.getActions()[0];
        expect(actionLogin).toEqual({
            type: types.login,
            payload: { uid: 'uiTest', displayName: 'jorge' }
        });
        store.dispatch(logout());
        const actionLogout = store.getActions()[store.getActions().length - 1];
        expect(actionLogout).toEqual({ type: types.logout });

    });

    test('should do startLogout', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: types.logout });
        expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
    });

    test('start login with email and password', async () => {
        await store.dispatch(startLoginWithEmailPassword('test@test.com', '123456'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: types.uiStartLoading });
        expect(actions[1]).toEqual({
            type: types.login,
            payload: { uid: 'lZxHs5vgSZQbAVMQmXyJAtZlzNm1', displayName: null }
        });
        expect(actions[2]).toEqual({ type: types.uiFinishLoading }
        );

    });

});