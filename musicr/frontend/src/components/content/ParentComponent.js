import { useState } from 'react';
import AlbumCard from './AlbumCard';
import MusicModal from './MusicModal';

function ParentComponent({albums}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const openModal = (album) => {
        setSelectedAlbum(album);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {albums.map(album => (
                <AlbumCard key={album.album_id} album={album} openModal={() => openModal(album)} />
            ))}
            <MusicModal isOpen={isModalOpen} onClose={closeModal} album={selectedAlbum} />
        </div>
    );
}

export default ParentComponent;
