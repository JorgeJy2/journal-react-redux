import { types } from "../types/types";
import { authReducer } from "./authReducer";

describe('test in auth reducer', ()=>{

    test('should login', ()=>{
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'jorge'
            }
        }
        const state = authReducer(initState, action );

        expect(state).toEqual({
            uid: 'abc',
                name: 'jorge'
        });

    });

    test('should logout', ()=>{
        const initState = { uid: 'abc',
        displayName: 'jorge'};
        const action = {
            type: types.logout
        }
        const state = authReducer(initState, action );
        expect(state).toEqual({});

    });

    test('should not found return init state', ()=>{
        const initState = { uid: 'abc',
        displayName: 'jorge'};
        const action = {
            type: 'not found'
        }
        const state = authReducer(initState, action );
        expect(state).toEqual(initState);

    });
});