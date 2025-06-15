import React, { useState } from 'react';
import ReviewsContainer from "../layout/ReviewsContainer";
import CreatePlaylistModal from '../content/CreatePlaylistModal';
import SharedNavbar from '../layout/SharedNavbar';

function Reviews() {
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);

    const handleCreatePlaylist = () => {
        setShowCreatePlaylistModal(true);
    };

    const handleCloseCreatePlaylistModal = () => {
        setShowCreatePlaylistModal(false);
    };    const handlePlaylistCreated = (newPlaylist) => {
        // Playlist created successfully
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)', 
            color: '#ffffff' 
        }}>            {/* Shared Navbar */}
            <SharedNavbar 
                activeRoute="reviews" 
                onCreatePlaylist={handleCreatePlaylist}
            />

            {/* Content com padding-top para compensar o header fixo */}
            <div style={{ paddingTop: '80px' }}>
                <ReviewsContainer />
            </div>

            {/* Create Playlist Modal */}
            <CreatePlaylistModal
                isOpen={showCreatePlaylistModal}
                onClose={handleCloseCreatePlaylistModal}
                onSuccess={handlePlaylistCreated}
            />
        </div>
    );
}

export default Reviews;