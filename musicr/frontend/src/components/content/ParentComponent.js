import { useState } from 'react';
import AlbumCard from './AlbumCard';
import MusicModal from './MusicModal';

function ParentComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <AlbumCard openModal={openModal} />
            <MusicModal isOpen={isModalOpen} onClose={closeModal} album="{/* passar o objeto do álbum aqui */}" />
        </div>
    );
}

export default ParentComponent;
