import React, { useState } from 'react';
import PlaylistSelectForm from '../forms/PlaylistSelectForm';
import styles from './musicmodal.module.css';
import SubmitButtonMusic from '../forms/SubmitButtonMusic';
import getCookie from '../../../utils/csfr';

var csrftoken = getCookie('csrftoken');

function MusicModal({ isOpen, onClose, album, playlists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handlePlaylistSelect = (event) => {
        setSelectedPlaylist(event.target.value);
    };

    // Função para adicionar a música à playlist selecionada
    const handleAddToPlaylist = (trackId) => {
        console.log('Playlist selecionada:', selectedPlaylist);
        console.log('Música selecionada:', trackId);
        if (selectedPlaylist && trackId) {
            const requestBody = {
                song: trackId,
                playlist: selectedPlaylist
            };
            console.log(requestBody);
            console.log(JSON.stringify(requestBody));

            // Faça a solicitação POST para adicionar a música à playlist
            fetch(`/playlists/playlists/add-song/${selectedPlaylist}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                content : JSON.stringify(requestBody),
            })
            .then(response => {
                if (response.ok) {
                    // Se a solicitação for bem-sucedida, faça algo, como fechar o modal
                    onClose();
                } else {
                    // Caso contrário, exiba uma mensagem de erro
                    console.error('Erro ao adicionar música à playlist:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Erro ao adicionar música à playlist:', error);
            });
        }
    };

    if (!isOpen || !album) return null;

    return (
        <div className={styles.modal} tabIndex="-1" role="dialog" >
            <div className={styles['modal-dialog']} role="document">
                <div className={styles['modal-content']}>
                    <div className={styles['modal-header']}>
                        <h5 className='modal-title'>{album.name} - Músicas</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={styles['modal-body']}>
                        <ul className={styles['music-ul']}>
                            {album.tracks.map((track, index) => (
                                <li className={styles['music-li']} key={index}>
                                    <span>{track.name} - {track.track_id}</span>
                                    <PlaylistSelectForm playlists={playlists} onSelect={handlePlaylistSelect} />
                                    <SubmitButtonMusic trackId={track.track_id} onClick={() => handleAddToPlaylist(track.track_id)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicModal;
