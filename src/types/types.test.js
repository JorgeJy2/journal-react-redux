import { types } from "./types";

const defaultTypes = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew: '[Notes] Add note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdate: '[Notes] Updated note',
    notesFileUrl: '[Notes] Updated image url',
    notesDelete: '[Notes] Deleted note',
    notesLogoutCleaning: '[Notes] Logout Cleaning',
};


describe('test in types', ()=>{
    test('should equals types', () => {
        expect(types).toEqual(defaultTypes);
    });
});