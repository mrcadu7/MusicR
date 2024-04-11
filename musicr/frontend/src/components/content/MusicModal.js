import { useState } from 'react';
import PlaylistSelectForm from '../forms/PlaylistSelectForm';
import styles from './musicmodal.module.css';
import SubmitButtonMusic from '../forms/SubmitButtonMusic';
import getCookie from '../../../utils/csfr';
import addToDb from '../../../utils/addToDb';

var csrftoken = getCookie('csrftoken');

function MusicModal({ isOpen, onClose, album, playlists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handlePlaylistSelect = (event) => {
        setSelectedPlaylist(event.target.value);
    };

    // Função para adicionar a música à playlist selecionada
    const handleAddToPlaylist = (track) => {
        console.log('Playlist selecionada:', selectedPlaylist);
        console.log('Música selecionada:', track.track_id);
        if (selectedPlaylist && track) {
            // Chama a função addToDb para adicionar os dados ao banco de dados, se necessário
            addToDb({
                songId: track.track_id,
                artistId: track.artist_id,
                artistName: track.artist_name,
                albumId: album.album_id,
                albumName: album.name,
                albumReleaseDate: album.release_date,
                songTitle: track.name,
                songDuration: track.duration,
            }).then(() => {
                // Cria o requestBody para a solicitação POST
                const requestBody = {
                    song: track.track_id,
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
                    body: JSON.stringify(requestBody),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Música adicionada à playlist com sucesso!');
                    } else {
                        // Caso contrário, exiba uma mensagem de erro
                        console.error('Erro ao adicionar música à playlist:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar música à playlist:', error);
                });
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
                                    <span>{track.name}</span>
                                    <PlaylistSelectForm playlists={playlists} onSelect={handlePlaylistSelect} />
                                    <SubmitButtonMusic track={track} onClick={() => handleAddToPlaylist(track)} />
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
