import { useState } from 'react';
import PlaylistFormCreate from '../forms/PlaylistFormCreate';
import getCookie from '../../../utils/csfr.js';

var csrftoken = getCookie('csrftoken');

function ErrorMessage({ message }) {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
}

function PlaylistCreate() {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async ({ title, description }) => {
        try {

            console.log({ title, description, image_url: '' });

            const response = await fetch('/playlists/playlists/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    user: 1 // mudar depois
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create playlist');
            }

            // Limpar os campos do formulário após o envio
            setErrorMessage('');
            alert('Playlist created successfully!');
        } catch (error) {
            console.error('Error creating playlist:', error);
            setErrorMessage('Failed to create playlist. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1>Create Playlist</h1>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <PlaylistFormCreate onSubmit={handleSubmit} />
        </div>
    );
}

export default PlaylistCreate;