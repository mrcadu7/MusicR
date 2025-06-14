import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getCookie from '../../../utils/csfr.js';
import styles from './CreatePlaylistModal.module.css';

const csrftoken = getCookie('csrftoken');

function CreatePlaylistModal({ isOpen, onClose, onSuccess }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError('O título é obrigatório');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/playlists/playlists/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                    user: 1 // mudar depois
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create playlist');
            }

            const newPlaylist = await response.json();
            
            // Limpar formulário
            setTitle('');
            setDescription('');
            
            // Notificar sucesso
            if (onSuccess) {
                onSuccess(newPlaylist);
            }
            
            onClose();
        } catch (error) {
            console.error('Error creating playlist:', error);
            setError('Erro ao criar playlist. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>Criar Nova Playlist</h2>
                        <button className={styles.closeBtn} onClick={handleClose}>
                            ×
                        </button>
                    </div>

                    <form className={styles.playlistForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="playlist-title" className={styles.label}>
                                Título *
                            </label>
                            <input
                                type="text"
                                id="playlist-title"
                                className={styles.input}
                                placeholder="Digite o título da sua playlist"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="playlist-description" className={styles.label}>
                                Descrição
                            </label>
                            <textarea
                                id="playlist-description"
                                className={styles.textarea}
                                placeholder="Conte sobre sua playlist..."
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <div className={styles.modalActions}>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={styles.createBtn}
                                disabled={isLoading || !title.trim()}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Criando...
                                    </>
                                ) : (
                                    'Criar Playlist'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreatePlaylistModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
};

CreatePlaylistModal.defaultProps = {
    onSuccess: null
};

export default CreatePlaylistModal;
