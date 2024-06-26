import { useState, useEffect } from 'react';
import AlbumReviewForm from "../forms/AlbumReviewForm"
import styles from './albumreviewmodal.module.css';
import getCookie from '../../../utils/csfr.js';

var csrftoken = getCookie('csrftoken');

function ErrorMessage({ message }) {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
}

function SuccessMessage({ message }) {
    return (
        <div className="alert alert-success" role="alert">
            {message}
        </div>
    );
}

function AlbumReviewModal ({isOpen, onClose, album}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [reviewExists, setReviewExists] = useState(false);

    useEffect(() => {
        // Verificar se o review existe quando o modal é aberto
        if (isOpen && album) {
            checkReviewExists();
        }
    }, [isOpen, album]);

    const checkReviewExists = async () => {
        try {
            const response = await fetch(`/playlists/album-reviews/exists/1/${album.song.album}`); // TODO: lidar com id de usuário
            if (!response.ok) {
                throw new Error('Failed to fetch review existence');
            }
            const data = await response.json();
            setReviewExists(data.exists);
        } catch (error) {
            console.error('Error checking review existence:', error);
        }
    };
    
    const handleSubmit = async ({ rating, review }) => {
        try {
            let method = 'POST';
            let url = '/playlists/album-reviews/create/';
            let success = 'Review created successfully!';
    
            if (reviewExists) {
                method = 'PUT';
                url = `/playlists/album-reviews/update/1/${album.song.album}/`;
                success = 'Review updated successfully!';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    rating: rating,
                    comment: review,
                    album: album.song.album,
                    user: 1 // mudar depois essa merda
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create review');
            }

            setSuccessMessage(success);
            console.log('Success message:', successMessage);

            // Fechar o modal após alguns segundos e limpar a mensagem de sucesso
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error creating review:', error);
            setErrorMessage('Failed to create review. Please try again later.');
        }
    };
    
    if (!isOpen || !album) return null;

    return (
        <div className={styles.modal} tabIndex="-1" role="dialog">
            <div className={styles['modal-dialog']} role="document">
                <div className={styles['modal-content']}>
                    <div className={styles['modal-header']}>
                        <h5 className={styles['modal-title']} style={{ fontSize: '50px' }}>{album.album}</h5>
                    </div>
                    <div className={styles['modal-body']}>
                        {/* Coloque aqui o conteúdo do formulário de revisão de música */}
                        <AlbumReviewForm onSubmit={handleSubmit} />
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    </div>
                    <div className={styles['modal-footer']}>
                        <button type="button" className="btn btn-dark" onClick={onClose}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumReviewModal