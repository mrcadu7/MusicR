function MusicModal({ isOpen, onClose, album, playlists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [selectedTrackId, setSelectedTrackId] = useState(null);

    const handlePlaylistSelect = (event) => {
        setSelectedPlaylist(event.target.value);
    };

    const handleSelectTrack = (trackId) => {
        setSelectedTrackId(trackId);
    };

    const handleAddToPlaylist = (trackId) => {
        if (selectedPlaylist && trackId) {
            // Faça a solicitação POST para adicionar a música à playlist
            fetch(`/playlists/playlists/add-song/${selectedPlaylist}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ song: trackId }),
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
        } else {
            console.log('Playlist ou música não selecionada.');
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
                                    <SubmitButtonMusic onClick={() => handleAddToPlaylist(track.id)} />
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
