import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc =
            await db
                .collection(`${uid}/journal/notes`)
                .add(newNote);

        console.log(doc);

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNote(doc.id, newNote));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const setNotes = ( notes ) =>({
    type: types.notesLoad,
    payload: notes
});


export const startloadingNotes = (uid) =>{
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const addNote = (id, note)  => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startSaveNote = (note) =>{
    return async(dispatch, getState) =>{
        const uid = getState().auth.uid;

        if(!note.url){
            delete note.url;
        }

        const noteToFireStore =  { ...note};
        delete noteToFireStore.id;
        
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);




    }
}