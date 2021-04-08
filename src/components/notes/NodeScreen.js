import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NodeScreen = () => {
    const { active: note } = useSelector(state => state.notes);
    
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm(note);

    const { body, title } = formValues;

    useEffect(() => {
        console.log(formValues);
        dispatch(activeNote(note.id, {
            ...formValues
        }));
    }, [formValues, dispatch]);

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
                        <img src="https://images.ctfassets.net/hrltx12pl8hq/6bi6wKIM5DDM5U1PtGVFcP/1c7fce6de33bb6575548a646ff9b03aa/nature-photography-pictures.jpg?fit=fill&w=800&h=300"
                            alt="image"
                        />
                    </div>
            }
        </div>
    )
}
