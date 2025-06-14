import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PlaylistModal.css';

function PlaylistModal({ playlist, onClose }) {
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (playlist) {
            fetchPlaylistDetails();
        }
    }, [playlist]);

    const fetchPlaylistDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/playlists/playlists/view/${playlist.id}/`);
            setPlaylistDetails(response.data);
            console.log('Playlist details:', response.data);
        } catch (error) {
            console.error('Error fetching playlist details:', error);
            setError('Erro ao carregar detalhes da playlist');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };    const formatDuration = (duration) => {
        if (!duration) return '0:00';
        
        // Se a duração vier no formato HH:MM:SS, processar
        if (typeof duration === 'string' && duration.includes(':')) {
            const parts = duration.split(':');
            if (parts.length === 3) {
                const hours = parseInt(parts[0]);
                const minutes = parseInt(parts[1]);
                const seconds = parseInt(parts[2]);
                
                if (hours > 0) {
                    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
            }
        }
        
        // Se for um número (segundos), converter para MM:SS
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const getDefaultImage = () => {
        return (
            <div className="modal-default-cover">
                <div className="modal-default-cover-content">
                    <div className="modal-music-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18V5L21 3V16M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18ZM21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16ZM9 10L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="modal-playlist-name">{playlist.title}</div>
                </div>
                <div className="modal-default-cover-overlay"></div>
            </div>
        );
    };    if (!playlist) return null;

    return (
        <div className="playlist-modal-overlay" onClick={onClose}>
            <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="modal-content">
                    <div className="playlist-cover-large">
                        {imageError || !playlist.image_url ? (
                            getDefaultImage()
                        ) : (
                            <img 
                                src={playlist.image_url} 
                                alt={`Playlist ${playlist.title}`}
                                onError={handleImageError}
                            />
                        )}
                    </div>

                    <div className="playlist-details">                        <div className="playlist-header-modal">
                            <h2 id="playlist-modal-title" className="playlist-title-modal">{playlist.title || 'Playlist sem nome'}</h2>
                            <p className="playlist-meta-modal">
                                Criada em {formatDate(playlist.created_at)}
                            </p>                            <div className="playlist-stats">
                                <span className="stats-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                    </svg>
                                    {playlistDetails?.song_details?.length ?? playlist.tracks_count ?? 0} {(playlistDetails?.song_details?.length ?? playlist.tracks_count ?? 0) === 1 ? 'música' : 'músicas'}
                                </span>
                            </div>
                            {playlist.description && (
                                <p className="playlist-description-modal">{playlist.description}</p>
                            )}
                        </div>                        {loading && (
                            <div className="modal-loading">
                                <div className="loading-spinner"></div>
                                <p>Carregando músicas...</p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="modal-error">
                                <p>{error}</p>
                            </div>
                        )}
                        
                        {!loading && !error && (
                            <div className="tracklist">
                                <h3 className="tracklist-title">Músicas</h3>
                                {playlistDetails?.song_details?.length > 0 ? (
                                    <div className="tracks">
                                        {playlistDetails.song_details.map((songDetail, index) => (
                                            <div key={songDetail.song?.song_id || index} className="track-item">
                                                <div className="track-number">{index + 1}</div>
                                                <div className="track-info">
                                                    <span className="track-name">{songDetail.song?.title || 'Música sem nome'}</span>
                                                    <span className="track-artist">{songDetail.artist || 'Artista desconhecido'}</span>
                                                </div>
                                                <div className="track-duration">
                                                    {formatDuration(songDetail.song?.duration)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-playlist">
                                        <div className="empty-icon">🎵</div>
                                        <p className="empty-text">Esta playlist está vazia</p>
                                        <p className="empty-subtext">Adicione algumas músicas para começar</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

PlaylistModal.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        image_url: PropTypes.string,
        created_at: PropTypes.string.isRequired,
        tracks_count: PropTypes.number,
        description: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
};

export default PlaylistModal;
