import React, { useState } from 'react';
import PlaylistSelectForm from '../forms/PlaylistSelectForm';
import styles from './musicmodal.module.css';


function MusicModal({ isOpen, onClose, album, playlists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handlePlaylistSelect = (event) => {
        setSelectedPlaylist(event.target.value);
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
                                    <span>{track.name}</span>
                                    <PlaylistSelectForm playlists={playlists} onSelect={handlePlaylistSelect} />
                                    <button onClick={() => handleAddToPlaylist(track)}>Adicionar</button>
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
