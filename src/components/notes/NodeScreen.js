import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NodeScreen = () => {
    return (
        <div className="nodes_main-content">
            <NotesAppBar />
            <div className="notes_content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    />
                <textarea 
                    placeholder="what happend today"
                    className="notes__textarea"
                    ></textarea>
            </div>

            <div className="notes__image">
                <img src="https://images.ctfassets.net/hrltx12pl8hq/6bi6wKIM5DDM5U1PtGVFcP/1c7fce6de33bb6575548a646ff9b03aa/nature-photography-pictures.jpg?fit=fill&w=800&h=300"
                    alt="image"
                />
            </div>
        </div>
    )
}
