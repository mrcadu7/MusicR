import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewHome.css';

function NewHome() {    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [showAlbumModal, setShowAlbumModal] = useState(false);    const [playlists, setPlaylists] = useState([]);
    const [showPlaylistDropdown, setShowPlaylistDropdown] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [successMessage, setSuccessMessage] = useState('');    const [showReviewModal, setShowReviewModal] = useState(false);    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    
    // Refs
    const searchRef = useRef(null);
    const artistSectionRef = useRef(null);useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
            // Fechar dropdown de playlists quando clicar fora
            if (!event.target.closest('.playlist-dropdown-container')) {
                setShowPlaylistDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Carregar playlists quando o componente montar
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('/playlists/playlists/view/all/');
                setPlaylists(response.data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`/spotify/search-artists/${query}/`);
            setSearchResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };    const handleSelectArtist = async (artist) => {
        setSearchQuery(artist.name);
        setShowResults(false);
        setIsLoading(true);
        
        try {
            const response = await axios.get(`/spotify/get-artist-info/${artist.id}/`);
            setSelectedArtist(response.data);
              // Scroll suave para a seção do artista após carregar os dados
            setTimeout(() => {
                if (artistSectionRef.current) {
                    const offsetTop = artistSectionRef.current.offsetTop - 120; // 120px de margem do topo
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 100); // Pequeno delay para garantir que o DOM foi atualizado
            
        } catch (error) {
            console.error('Error fetching artist info:', error);
        } finally {
            setIsLoading(false);
        }
    };    const clearSearch = () => {
        setSearchQuery('');
        setSelectedArtist(null);
        setSearchResults([]);
        setShowResults(false);
    };

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
        setShowAlbumModal(true);
    };    const closeAlbumModal = () => {
        setShowAlbumModal(false);
        setSelectedAlbum(null);
    };

    // Função para obter CSRF token
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // Função para adicionar dados ao banco
    const addToDb = async ({ songId, artistId, artistName, albumId, albumName, albumReleaseDate, songTitle, songDuration }) => {
        try {
            const csrftoken = getCookie('csrftoken');

            const artistRequestBody = {
                name: artistName,
                artist_id: artistId,
            };

            const albumRequestBody = {
                artist: artistId,
                title: albumName,
                release_date: albumReleaseDate,
                album_id: albumId,
            };

            const songRequestBody = {
                artist: artistId,
                album: albumId,
                title: songTitle,
                duration: songDuration,
                song_id: songId
            };

            const [songExists, albumExists, artistExists] = await Promise.all([
                fetch(`/playlists/songs/exists/${songId}/`).then(res => res.json()).then(data => data.exists),
                fetch(`/playlists/albums/exists/${albumId}/`).then(res => res.json()).then(data => data.exists),
                fetch(`/playlists/artists/exists/${artistId}/`).then(res => res.json()).then(data => data.exists)
            ]);

            if (!songExists) {
                if (!albumExists) {
                    if (!artistExists) {
                        await fetch(`/playlists/artists/create/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': csrftoken
                            },
                            body: JSON.stringify(artistRequestBody)
                        });
                    }
                    await fetch(`/playlists/albums/create/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken
                        },
                        body: JSON.stringify(albumRequestBody)
                    });
                }
                await fetch(`/playlists/songs/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify(songRequestBody)
                });
            }
        } catch (error) {
            console.error('Error adding to database:', error);
        }
    };

    // Função para adicionar música à playlist
    const handleAddToPlaylist = async (track, playlistId) => {
        try {
            const csrftoken = getCookie('csrftoken');

            // Primeiro adiciona os dados ao banco se necessário
            await addToDb({
                songId: track.track_id,
                artistId: track.artist_id,
                artistName: selectedArtist.name,
                albumId: selectedAlbum.album_id,
                albumName: selectedAlbum.name,
                albumReleaseDate: selectedAlbum.release_date,
                songTitle: track.name,
                songDuration: track.duration,
            });

            // Depois adiciona à playlist
            const requestBody = {
                song: track.track_id,
                playlist: playlistId
            };

            const response = await fetch(`/playlists/playlists/add-song/${playlistId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const playlist = playlists.results?.find(p => p.id === playlistId) || { title: 'Playlist' };
                setSuccessMessage(`"${track.name}" foi adicionada à playlist "${playlist.title}" com sucesso!`);
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                console.error('Erro ao adicionar música à playlist:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar música à playlist:', error);
        }        setShowPlaylistDropdown(null);
    };

    const handleAddAlbumToPlaylist = async (album, playlistId) => {
        try {
            // Adicionar todas as faixas do álbum à playlist
            if (album.tracks && album.tracks.length > 0) {
                for (const track of album.tracks) {
                    await handleAddToPlaylist(track, playlistId);
                }
                const playlist = playlists.results?.find(p => p.id === playlistId) || { title: 'Playlist' };
                setSuccessMessage(`Álbum "${album.name}" (${album.tracks.length} faixas) foi adicionado à playlist "${playlist.title}" com sucesso!`);
                setTimeout(() => setSuccessMessage(''), 4000);
            }
        } catch (error) {
            console.error('Erro ao adicionar álbum à playlist:', error);        }
        setShowPlaylistDropdown(null);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        
        if (!reviewRating || !reviewText.trim()) {
            alert('Por favor, preencha todos os campos do review.');
            return;
        }

        try {
            const csrftoken = getCookie('csrftoken');
            
            // Primeiro, garantir que o artista existe no banco
            await addToDb({
                artistId: selectedArtist.id,
                artistName: selectedArtist.name,
                songId: '',
                albumId: '',
                albumName: '',
                albumReleaseDate: '',
                songTitle: '',
                songDuration: 0
            });

            // Depois, enviar o review
            const response = await fetch('/playlists/artistreviews/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    artist: selectedArtist.id,
                    rating: reviewRating,
                    review_text: reviewText
                })
            });

            if (response.ok) {
                setSuccessMessage(`Review para "${selectedArtist.name}" criado com sucesso!`);
                setShowReviewModal(false);
                setReviewRating(0);
                setReviewText('');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const errorData = await response.json();
                console.error('Erro ao criar review:', errorData);
                alert('Erro ao criar review. Tente novamente.');
            }        } catch (error) {
            console.error('Erro ao enviar review:', error);
            alert('Erro ao enviar review. Tente novamente.');
        }
    };    const handleShowPlaylistDropdown = (dropdownId, event, type = 'track') => {
        event.preventDefault();
        event.stopPropagation();
        
        // Para álbuns, calcular posição fixa
        if (type === 'album') {
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const dropdownWidth = 320;
            
            let left = buttonRect.right + 10; // À direita do botão
            let top = buttonRect.top;
            
            // Verificar se sai da tela pela direita
            if (left + dropdownWidth > window.innerWidth - 10) {
                left = buttonRect.left - dropdownWidth - 10; // Move para a esquerda
            }
            
            // Verificar se sai da tela por baixo
            if (top + 350 > window.innerHeight - 10) {
                top = window.innerHeight - 350 - 10;
            }
            
            setDropdownPosition({ top, left });
        }
        
        // Toggle do dropdown
        setShowPlaylistDropdown(showPlaylistDropdown === dropdownId ? null : dropdownId);
    };

    // Função para lidar com rating de meio-estrela
    const handleStarClick = (rating) => {
        setReviewRating(rating);
    };

    const handleStarMouseEnter = (rating) => {
        setHoverRating(rating);
    };

    const handleStarMouseLeave = () => {
        setHoverRating(0);
    };

    // Função para determinar se uma estrela deve estar ativa
    const getStarState = (starIndex, half = false) => {
        const currentRating = hoverRating || reviewRating;
        const starValue = half ? starIndex - 0.5 : starIndex;
        return currentRating >= starValue;
    };return (
        <div className="new-home">
            {/* Modern Header */}
            <header className="modern-header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-text">MusicR</span>
                    </Link>
                    <nav className="nav-links">
                        <Link to="/playlist" className="nav-link">Playlists</Link>
                        <Link to="/reviews" className="nav-link">Reviews</Link>
                        <Link to="/playlist/create" className="nav-link create-btn">Create Playlist</Link>
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
                <div className="hero-content">                    <h1 className="hero-title">
                        Discover Your Next{' '}
                        <span className="gradient-text">Musical Obsession</span>
                    </h1>
                    <p className="hero-subtitle">
                        Explore artists, create reviews, and build the perfect playlists.
                        Your musical journey starts here.
                    </p>
                </div>

                {/* Modern Search Bar */}
                <div className="search-container" ref={searchRef}>
                    <div className="search-wrapper">
                        <div className="search-input-wrapper">
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L15.514 15.506L21 21ZM17 10C17 14.4183 13.4183 18 9 18C4.58172 18 1 14.4183 1 10C1 5.58172 4.58172 2 9 2C13.4183 2 17 5.58172 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search for your favorite artists..."
                                value={searchQuery}
                                onChange={handleSearch}
                                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                            />
                            {searchQuery && (
                                <button className="clear-btn" onClick={clearSearch}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="loading-indicator">
                                <div className="spinner"></div>
                            </div>
                        )}

                        {/* Search Results */}
                        {showResults && searchResults.length > 0 && (
                            <div className="search-results">                                {searchResults.map((artist, index) => (
                                    <button
                                        key={artist.id}
                                        className="search-result-item"
                                        onClick={() => handleSelectArtist(artist)}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                        type="button"
                                    >
                                        <div className="artist-avatar">
                                            {artist.images && artist.images.length > 0 ? (
                                                <img src={artist.images[0].url} alt={artist.name} />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="artist-info">
                                            <span className="artist-name">{artist.name}</span>
                                            <span className="artist-followers">
                                                {artist.followers?.total?.toLocaleString() || '0'} followers
                                            </span>
                                        </div>
                                        <div className="popularity-indicator">
                                            <div 
                                                className="popularity-bar"
                                                style={{ width: `${artist.popularity || 0}%` }}                                            ></div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>            {/* Selected Artist Display */}
            {selectedArtist && (
                <section className="artist-display" ref={artistSectionRef}>
                    <div className="artist-card"><div className="artist-header">
                            <div className="artist-image">
                                {selectedArtist.image_url ? (
                                    <img src={selectedArtist.image_url} alt={selectedArtist.name} />
                                ) : (
                                    <div className="image-placeholder">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="artist-details">
                                <h2 className="artist-title">{selectedArtist.name}</h2>
                                <div className="artist-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Followers</span>
                                        <span className="stat-value">
                                            {selectedArtist.followers?.total?.toLocaleString() || '0'}
                                        </span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Popularity</span>
                                        <span className="stat-value">{selectedArtist.popularity || 0}%</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Genres</span>
                                        <div className="genres">                                            {selectedArtist.genres?.slice(0, 3).map((genre) => (
                                                <span key={genre} className="genre-tag">{genre}</span>
                                            )) || <span className="genre-tag">Unknown</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div className="artist-actions">
                            <button 
                                className="action-btn primary"
                                onClick={() => setShowReviewModal(true)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 14C19 15.1 18.1 16 17 16S15 15.1 15 14 15.9 12 17 12 19 12.9 19 14ZM6 10C4.9 10 4 10.9 4 12S4.9 14 6 14 8 13.1 8 12 7.1 10 6 10ZM12 16C10.9 16 10 16.9 10 18S10.9 20 12 20 14 19.1 14 18 13.1 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                Create Review
                            </button></div>
                    </div>

                    {/* Albums Grid */}
                    {selectedArtist.albums && selectedArtist.albums.length > 0 && (
                        <div className="albums-section">
                            <h3 className="albums-title">Albums</h3>
                            <div className="albums-grid">
                                {selectedArtist.albums.map((album) => (                                    <div 
                                        key={album.album_id} 
                                        className={`album-card ${showPlaylistDropdown === `album_${album.album_id}` ? 'dropdown-active' : ''}`}
                                        onClick={() => handleAlbumClick(album)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleAlbumClick(album);
                                            }
                                        }}
                                    >
                                        <div className="album-cover">
                                            <img 
                                                src={album.image_url || '/placeholder-album.jpg'} 
                                                alt={album.name}
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0xMDAgNTBDMTI3LjYxNCA1MCAxNTAgNzIuMzg1OCAxNTAgMTAwUzEyNy42MTQgMTUwIDEwMCAxNTBTNTAgMTI3LjYxNCA1MCAxMDBTNzIuMzg1OCA1MCAxMDAgNTBaTTEwMCA3NUMxMDkuNjY1IDc1IDExNy41IDgyLjgzNSAxMTcuNSA5Mi41UzEwOS42NjUgMTEwIDEwMCAxMTBTODIuNSAxMDIuMTY1IDgyLjUgOTIuNVM5MC4zMzUgNzUgMTAwIDc1WiIgZmlsbD0iIzhBMkJFMiIvPgo8L3N2Zz4K';
                                                }}
                                            />
                                            <div className="album-overlay">
                                                <div className="play-button">
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>                                        <div className="album-info">
                                            <h4 className="album-name">{album.name}</h4>
                                            <p className="album-year">{new Date(album.release_date).getFullYear()}</p>
                                            <div className="album-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <span 
                                                        key={i} 
                                                        className={`star ${i < Math.floor(album.average_rating || 0) ? 'filled' : ''}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span className="rating-text">
                                                    {album.average_rating ? album.average_rating.toFixed(1) : '0.0'}
                                                </span>
                                            </div>                                            <div className="album-actions">
                                                <div className="playlist-dropdown-container">
                                                    <button 
                                                        className="album-playlist-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShowPlaylistDropdown(`album_${album.album_id}`, e, 'album');
                                                        }}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        Add Album
                                                    </button>                                                    {showPlaylistDropdown === `album_${album.album_id}` && (
                                                        <div 
                                                            className="playlist-dropdown album-dropdown"
                                                            style={{
                                                                top: `${dropdownPosition.top}px`,
                                                                left: `${dropdownPosition.left}px`
                                                            }}
                                                        ><div className="dropdown-header">
                                                                <span>Adicionar álbum à playlist</span>
                                                                <button 
                                                                    className="dropdown-close"
                                                                    onClick={() => setShowPlaylistDropdown(null)}
                                                                >
                                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="playlist-list">
                                                                {playlists.results?.length > 0 ? (
                                                                    playlists.results.map((playlist) => (
                                                                        <button
                                                                            key={playlist.id}
                                                                            className="playlist-item"
                                                                            onClick={() => handleAddAlbumToPlaylist(album, playlist.id)}
                                                                        >
                                                                            <div className="playlist-icon">
                                                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                                                                </svg>
                                                                            </div>
                                                                            <span className="playlist-name">{playlist.title}</span>
                                                                            <span className="playlist-count">{playlist.song_count || 0} músicas</span>
                                                                        </button>
                                                                    ))
                                                                ) : (
                                                                    <div className="no-playlists">
                                                                        <span>Nenhuma playlist encontrada</span>
                                                                        <Link to="/playlist/create" className="create-playlist-link">
                                                                            Criar primeira playlist
                                                                        </Link>                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}            {/* Album Modal */}
            {showAlbumModal && selectedAlbum && (
                <div className="album-modal-overlay" onClick={closeAlbumModal}>
                    <div className="album-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeAlbumModal}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        {/* Success Message */}
                        {successMessage && (
                            <div className="success-message">
                                <div className="success-content">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                    <span>{successMessage}</span>
                                </div>
                            </div>
                        )}
                        
                        <div className="modal-content">
                            <div className="album-cover-large">
                                <img src={selectedAlbum.image_url || '/placeholder-album.jpg'} alt={selectedAlbum.name} />
                            </div>
                            
                            <div className="album-details">
                                <div className="album-header-modal">
                                    <h2 className="album-title-modal">{selectedAlbum.name}</h2>
                                    <p className="album-artist-modal">{selectedArtist.name}</p>
                                    <p className="album-year-modal">{new Date(selectedAlbum.release_date).getFullYear()}</p>
                                    <div className="album-rating-modal">
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={`album-star-${i}`} 
                                                className={`star-large ${i < Math.floor(selectedAlbum.average_rating || 0) ? 'filled' : ''}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                        <span className="rating-text-large">
                                            {selectedAlbum.average_rating ? selectedAlbum.average_rating.toFixed(1) : '0.0'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="tracklist">
                                    <h3 className="tracklist-title">Tracklist</h3>
                                    <div className="tracks">
                                        {selectedAlbum.tracks?.map((track, index) => (
                                            <div key={track.track_id} className="track-item">
                                                <div className="track-number">{index + 1}</div>
                                                <div className="track-info">
                                                    <span className="track-name">{track.name}</span>
                                                    <span className="track-duration">
                                                        {Math.floor(track.duration / 60)}:
                                                        {String(Math.floor(track.duration % 60)).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <div className="track-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span 
                                                            key={`track-${track.track_id}-star-${i}`} 
                                                            className={`star-small ${i < Math.floor(track.average_rating || 0) ? 'filled' : ''}`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="playlist-dropdown-container">                                                    <button 
                                                        className="add-to-playlist-btn"
                                                        onClick={(e) => handleShowPlaylistDropdown(track.track_id, e, 'track')}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>                                                    {showPlaylistDropdown === track.track_id && (
                                                        <div className="playlist-dropdown track-dropdown"><div className="dropdown-header">
                                                                    <span>Adicionar à playlist</span>
                                                                    <button 
                                                                        className="dropdown-close"
                                                                        onClick={() => setShowPlaylistDropdown(null)}
                                                                    >
                                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className="playlist-list">
                                                                    {playlists.results?.length > 0 ? (
                                                                        playlists.results.map((playlist) => (
                                                                            <button
                                                                                key={playlist.id}
                                                                                className="playlist-item"
                                                                                onClick={() => handleAddToPlaylist(track, playlist.id)}
                                                                            >
                                                                                <div className="playlist-icon">
                                                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                                                                    </svg>
                                                                                </div>
                                                                                <span className="playlist-name">{playlist.title}</span>
                                                                                <span className="playlist-count">{playlist.song_count || 0} músicas</span>
                                                                            </button>
                                                                        ))
                                                                    ) : (
                                                                        <div className="no-playlists">
                                                                            <span>Nenhuma playlist encontrada</span>
                                                                            <Link to="/playlist/create" className="create-playlist-link">
                                                                                Criar primeira playlist
                                                                            </Link>                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && selectedArtist && (
                <div className="review-modal-overlay" onClick={() => setShowReviewModal(false)}>
                    <div className="review-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowReviewModal(false)}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <div className="review-modal-content">
                            <div className="review-header">
                                <div className="artist-info-review">
                                    <img 
                                        src={selectedArtist.image_url || '/placeholder-artist.jpg'} 
                                        alt={selectedArtist.name}
                                        className="artist-image-small"
                                    />
                                    <div>
                                        <h3>{selectedArtist.name}</h3>
                                        <p>Create a review for this artist</p>
                                    </div>
                                </div>
                            </div>
                            
                            <form className="review-form" onSubmit={handleSubmitReview}>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating</label>                                    <div className="rating-input" onMouseLeave={handleStarMouseLeave}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div key={star} className="star-wrapper">
                                                {/* Área clicável para meia estrela */}
                                                <button
                                                    type="button"
                                                    className="star-half-btn left"
                                                    onClick={() => handleStarClick(star - 0.5)}
                                                    onMouseEnter={() => handleStarMouseEnter(star - 0.5)}
                                                ></button>
                                                {/* Área clicável para estrela completa */}
                                                <button
                                                    type="button"
                                                    className="star-half-btn right"
                                                    onClick={() => handleStarClick(star)}
                                                    onMouseEnter={() => handleStarMouseEnter(star)}
                                                ></button>
                                                {/* Estrela visual */}
                                                <span 
                                                    className={`star-visual ${
                                                        getStarState(star) ? 'full' : 
                                                        getStarState(star, true) ? 'half' : 'empty'
                                                    }`}
                                                >
                                                    ★
                                                </span>
                                            </div>
                                        ))}
                                        <div className="rating-value">
                                            {(hoverRating || reviewRating || 0).toFixed(1)} / 5
                                        </div>
                                    </div>
                                </div>
                                  <div className="form-group">
                                    <label htmlFor="review-text">Review</label>
                                    <textarea
                                        id="review-text"
                                        placeholder="Share your thoughts about this artist..."
                                        rows="6"
                                        className="review-textarea"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    />
                                </div>
                                
                                <div className="form-actions">
                                    <button type="button" className="btn-cancel" onClick={() => setShowReviewModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-submit">
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewHome;
