import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlaylistsCard from "../content/PlaylistsCard";
import PlaylistModal from "../content/PlaylistModal";
import CreatePlaylistModal from "../content/CreatePlaylistModal";
import './Playlists.css';

function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);useEffect(() => {
        async function fetchPlaylists() {
            try {
                setLoading(true);
                const response = await axios.get('/playlists/playlists/view/all/');
                console.log(response.data.results);
                setPlaylists(response.data.results);
            } catch (error) {
                console.error('Error fetching playlists:', error);
                setError('Erro ao carregar playlists. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }

        fetchPlaylists();
    }, []);

    const handlePlaylistClick = (playlist) => {
        setSelectedPlaylist(playlist);
        setShowModal(true);
    };    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPlaylist(null);
    };

    const handleCreatePlaylist = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handlePlaylistCreated = (newPlaylist) => {
        setPlaylists(prev => [...prev, newPlaylist]);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Carregando suas playlists...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <p className="error-text">{error}</p>
                    <button className="retry-btn" onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </button>
                </div>
            );
        }

        if (playlists.length === 0) {
            return (
                <div className="empty-state">
                    <div className="empty-icon">🎵</div>
                    <h3 className="empty-title">Nenhuma playlist ainda</h3>
                    <p className="empty-text">Comece criando sua primeira playlist musical!</p>                    <button onClick={handleCreatePlaylist} className="empty-action-btn">
                        Criar Primeira Playlist
                    </button>
                </div>
            );
        }

        return (
            <>
                <div className="playlists-header-section">
                    <h2 className="section-title">Suas Playlists</h2>
                    <p className="section-subtitle">{playlists.length} playlist{playlists.length !== 1 ? 's' : ''} encontrada{playlists.length !== 1 ? 's' : ''}</p>
                </div>
                
                <div className="playlists-grid">
                    {playlists.map(playlist => (
                        <PlaylistsCard 
                            key={playlist.id} 
                            playlist={playlist} 
                            onPlaylistClick={handlePlaylistClick}
                        />
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="modern-playlists-page">
            {/* Modern Header */}
            <header className="playlists-header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-text">MusicR</span>
                    </Link>
                    <nav className="nav-links">
                        <Link to="/playlist" className="nav-link active">Playlists</Link>
                        <Link to="/reviews" className="nav-link">Reviews</Link>
                        <button onClick={handleCreatePlaylist} className="nav-link create-btn">Create Playlist</button>
                    </nav>
                </div>
            </header>

            {/* Animated Background */}
            <div className="animated-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your Musical <span className="gradient-text">Collections</span>
                    </h1>
                    <p className="hero-subtitle">
                        Organize your favorite tracks into curated playlists and discover new musical journeys.
                    </p>
                </div>

                {/* Action Button */}
                <div className="hero-actions">                    <button onClick={handleCreatePlaylist} className="create-playlist-btn">
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Create New Playlist
                    </button>
                </div>
            </section>            {/* Main Content */}
            <section className="playlists-content">
                <div className="content-container">
                    {renderContent()}
                </div>
            </section>            {/* Playlist Modal */}
            {showModal && selectedPlaylist && (
                <PlaylistModal 
                    playlist={selectedPlaylist}
                    onClose={handleCloseModal}
                />
            )}

            {/* Create Playlist Modal */}
            <CreatePlaylistModal
                isOpen={showCreateModal}
                onClose={handleCloseCreateModal}
                onSuccess={handlePlaylistCreated}
            />
        </div>
    );
}

export default Playlists;
