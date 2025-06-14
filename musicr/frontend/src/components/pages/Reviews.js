import React from 'react';
import { Link } from 'react-router-dom';
import ReviewsContainer from "../layout/ReviewsContainer";

function Reviews() {
    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)', 
            color: '#ffffff' 
        }}>
            {/* Modern Header igual à homepage */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: 'rgba(20, 20, 20, 0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(138, 43, 226, 0.2)',
                padding: '1rem 0'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}>
                    <Link to="/" style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: '#8a2be2',
                        textDecoration: 'none'
                    }}>
                        MusicR
                    </Link>
                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/playlist" style={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                        }}>
                            Playlists
                        </Link>
                        <Link to="/reviews" style={{
                            color: '#8a2be2',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}>
                            Reviews
                        </Link>
                        <Link to="/playlist/create" style={{
                            background: 'linear-gradient(135deg, #8a2be2, #663399)',
                            color: '#ffffff',
                            textDecoration: 'none',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '20px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}>
                            Create Playlist
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content com padding-top para compensar o header fixo */}
            <div style={{ paddingTop: '80px' }}>
                <ReviewsContainer />
            </div>
        </div>
    );
}

export default Reviews;