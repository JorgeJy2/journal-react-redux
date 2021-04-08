
/* 
    {
        notes: [],
        active: null, 
        active:{
            id: 23nskd,
            title: '',
            body: '',
            imageUrl: '',
            date: 13232332
        }
    }
*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        case types.notesAddNew:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        default:
            return state;
    }
};
