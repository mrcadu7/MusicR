import React, { useState } from 'react';

function PlaylistFormCreate({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ title, description });
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Talk about your playlist"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Create Playlist
            </button>
        </form>
    );
}

export default PlaylistFormCreate;