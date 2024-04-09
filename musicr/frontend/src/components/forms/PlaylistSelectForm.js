import React from 'react';
import styles from './playlistselectform.module.css';

function PlaylistSelectForm({ playlists, onSelect }) {
    return (
        <div className={styles['form-group']}>
            <label htmlFor="playlistSelect" className={styles['form-label']}/>
            <select className={styles['form-select']} id="playlistSelect" onChange={onSelect}>
                <option value="">Selecione...</option>
                {playlists.results.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>{playlist.title}</option>
                ))}
            </select>
        </div>
    );
}

export default PlaylistSelectForm;