import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NodeScreen = () => {
    const { active: note } = useSelector(state => state.notes);
    
    const dispatch = useDispatch();

    const [formValues, handleInputChange, reset ] = useForm(note);

    const { body, title } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        if(note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [formValues, reset]);

    useEffect(() => {
        dispatch(activeNote(note.id, {
                 ...formValues
            }));
    }, [formValues]);

    const handleDelete = () =>{
        dispatch(startDeleting(note.id));
    };

    return (
        <div className="nodes_main-content">
            <NotesAppBar />
            <div className="notes_content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="what happend today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            {
                (note.url) 
                &&
                    <div className="notes__image">
                        <img src={note.url}
                            alt="image"
                        />
                    </div>
            }

            <button
                onClick={handleDelete} 
                className="btn btn-danger" >
                Delete
            </button>
        </div>
    )
}
