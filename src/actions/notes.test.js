
/** * @jest-environment node */
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { db } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { startloadingNotes, startNewNote } from './notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '3JPmnrJzvnTyZVOELroq',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

global.scrollTo = jest.fn();

jest.mock('../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}))

let store = mockStore(initState);

describe('test in notes', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should shoud create new note in start note', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({

            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[1].payload.id;

        await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    });

    test('should start loading notes should load notes', async () => {
        await store.dispatch(startloadingNotes('TESTING'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
            url: expect.any(String)
        };

        expect(actions[0].payload[0]).toEqual(expected);
    });


    // CHECK this.....
    // test('should upload url in bd', async () => {
    //     // const file = new File([], 'foto.jpg');
    //     await store.dispatch( startUploading( [] )  );

    //     const docRef = await db.doc(`/TESTING/journal/notes/3JPmnrJzvnTyZVOELroq`).get();
    //     expect(docRef.data().url).toBe('https://image-test.jpg');
    // });

});
