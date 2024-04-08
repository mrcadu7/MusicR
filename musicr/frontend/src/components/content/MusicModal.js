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
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{album.name} - Músicas</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PlaylistSelectForm playlists={playlists} onSelect={handlePlaylistSelect} />
                        <ul>
                            {album.tracks.map((track, index) => (
                                <li key={index}>{track.name}</li>
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
