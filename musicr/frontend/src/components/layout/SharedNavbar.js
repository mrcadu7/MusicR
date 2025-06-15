import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SharedNavbar.css';

function SharedNavbar({ activeRoute, onCreatePlaylist }) {
    return (
        <header className="shared-navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">
                    <span className="navbar-logo-text">MusicR</span>
                </Link>
                <nav className="navbar-links">
                    <Link 
                        to="/playlist" 
                        className={`navbar-link ${activeRoute === 'playlists' ? 'active' : ''}`}
                    >
                        Playlists
                    </Link>
                    <Link 
                        to="/reviews" 
                        className={`navbar-link ${activeRoute === 'reviews' ? 'active' : ''}`}
                    >
                        Reviews
                    </Link>
                    {onCreatePlaylist && (
                        <button 
                            onClick={onCreatePlaylist} 
                            className="navbar-link navbar-create-btn"
                        >
                            Create Playlist
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

SharedNavbar.propTypes = {
    activeRoute: PropTypes.string,
    onCreatePlaylist: PropTypes.func
};

SharedNavbar.defaultProps = {
    activeRoute: '',
    onCreatePlaylist: null
};

export default SharedNavbar;
