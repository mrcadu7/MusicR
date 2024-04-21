import { useState, useEffect } from 'react';

import styles from './musicmodal.module.css';
import SubmitButtonMusic from '../forms/SubmitButtonMusic';
import getCookie from '../../../utils/csfr';
import addToDb from '../../../utils/addToDb';
import AlbumTable from '../layout/AlbumTable';

var csrftoken = getCookie('csrftoken');


async function songInPlaylistExists(songId, playlistId) {
    const response = await fetch(`/playlists/playlists/view/${playlistId}/`);
    if (response.ok) {
        const playlist = await response.json();
        return playlist.song_details.some(song => song.song.song_id === songId);
    } else {
        console.error('Erro ao buscar playlist:', response.statusText);
        return false;
    }
}


function MusicModal({ isOpen, onClose, album, playlists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [trackToAdd, setTrackToAdd] = useState({ key: 0, track: null });

    useEffect(() => {
        if (trackToAdd.track) {
            const addSongToPlaylist = async () => {
                const songExists = await songInPlaylistExists(trackToAdd.track.track_id, selectedPlaylist);
                if (songExists) {
                    const shouldAdd = window.confirm('Essa música já existe na playlist. Você gostaria de adicioná-la mesmo assim?');
                    if (!shouldAdd) {
                        return;
                    }
                }
                handleAddToPlaylist(trackToAdd.track);
            };
            addSongToPlaylist();
        }
    }, [selectedPlaylist, trackToAdd]);

    const handlePlaylistSelect = (playlistId, track) => {
        setSelectedPlaylist(playlistId);
        setTrackToAdd(prevState => ({ key: prevState.key + 1, track }));
    };

    // Função para adicionar a música à playlist selecionada
    const handleAddToPlaylist = async (track) => {
        console.log('Playlist selecionada:', selectedPlaylist);
        console.log('Música selecionada:', track.track_id);
        if (selectedPlaylist && track) {

            console.log('Dados da música:', {
                songId: track.track_id,
                artistId: track.artist_id,
                artistName: track.artist_name,
                albumId: album.album_id,
                albumName: album.name,
                albumReleaseDate: album.release_date,
                songTitle: track.name,
                songDuration: track.duration,
            });

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
                
                console.log('Dados a serem enviados na solicitação POST:', requestBody);
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
                        <h5 className='modal-title' style={{ fontSize: '50px' }}>{album.name}</h5>
                    </div>
                    <div className={styles['modal-body']}>
                        <AlbumTable album={album} playlists={playlists} handlePlaylistSelect={handlePlaylistSelect} />
                    </div>
                    <br />
                    <br />
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark" onClick={onClose}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicModal;
