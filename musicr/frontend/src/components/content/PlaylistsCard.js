import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PlaylistsCard.css';

function PlaylistsCard({ playlist, onPlaylistClick }) {
    const [imageError, setImageError] = useState(false);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const getDefaultImage = () => {
        return (
            <div className="default-cover">
                <div className="default-cover-content">
                    <div className="music-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18V5L21 3V16M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18ZM21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16ZM9 10L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="playlist-name">{playlist.title}</div>
                </div>
                <div className="default-cover-overlay"></div>
            </div>
        );
    };    const handlePlaylistClick = (e) => {
        e.preventDefault();
        if (onPlaylistClick) {
            onPlaylistClick(playlist);
        }
    };

    const getTrackCount = (playlist) => {
        // Tenta diferentes possibilidades de contagem de músicas
        if (playlist.tracks_count !== undefined) return playlist.tracks_count;
        if (playlist.songs_count !== undefined) return playlist.songs_count;
        if (playlist.song_count !== undefined) return playlist.song_count;
        if (playlist.tracks && Array.isArray(playlist.tracks)) return playlist.tracks.length;
        if (playlist.songs && Array.isArray(playlist.songs)) return playlist.songs.length;
        if (playlist.song_details && Array.isArray(playlist.song_details)) return playlist.song_details.length;
        
        // Log para debug - vamos ver que propriedades estão disponíveis
        console.log('Playlist object:', playlist);
        console.log('Available properties:', Object.keys(playlist));
        
        return 0;
    };

    return (
        <button 
            className="modern-playlist-card" 
            onClick={handlePlaylistClick}
            aria-label={`Ver detalhes da playlist ${playlist.title || 'sem nome'}`}
        >
            <div className="card-link">
                <div className="card-cover-container">
                    {imageError || !playlist.image_url ? (
                        getDefaultImage()
                    ) : (
                        <img 
                            src={playlist.image_url} 
                            alt={`Playlist ${playlist.title}`}
                            className="card-cover-image"
                            onError={handleImageError}
                        />
                    )}
                    <div className="card-overlay">
                        <div className="play-button">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card-info">
                <div className="card-title-link">
                    <h3 className="card-title">{playlist.title || 'Playlist sem nome'}</h3>
                </div>                <div className="card-meta">
                    <span className="card-date">{formatDate(playlist.created_at)}</span>
                    <span className="card-tracks">
                        {getTrackCount(playlist)} {getTrackCount(playlist) === 1 ? 'música' : 'músicas'}
                    </span>
                </div>
                {playlist.description && (
                    <p className="card-description">{playlist.description}</p>                )}
            </div>
        </button>
    );
}

PlaylistsCard.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        image_url: PropTypes.string,
        created_at: PropTypes.string.isRequired,
        tracks_count: PropTypes.number,
        description: PropTypes.string
    }).isRequired,
    onPlaylistClick: PropTypes.func.isRequired
};

export default PlaylistsCard;