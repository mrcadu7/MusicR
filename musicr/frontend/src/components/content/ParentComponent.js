import { useState, useEffect  } from 'react';
import axios from 'axios';
import AlbumCard from './AlbumCard';
import MusicModal from './MusicModal';

function ParentComponent({albums}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const response = await axios.get('/playlists/playlists/view/all/');
                setPlaylists(response.data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        }

        fetchPlaylists();
    }, []);


    const openModal = (album) => {
        setSelectedAlbum(album);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <div className="row" style={{ paddingLeft: '75px', paddingRight: '75px' }}>
                {albums.map(album => (
                    <div key={album.album_id} className="col-md-3" style={{ marginBottom: '20px' }}>
                        <AlbumCard album={album} openModal={() => openModal(album)} />
                    </div>
                ))}
            </div>
            <MusicModal isOpen={isModalOpen} onClose={closeModal} album={selectedAlbum} playlists={playlists} />
        </div>
    );
}

export default ParentComponent;
