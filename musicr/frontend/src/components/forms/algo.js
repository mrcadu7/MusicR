import React, { useState } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton';

function SearchArtistForm({ onRequestArtistInfo }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(null);

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        try {
            const response = await axios.get(`/api/search-artists/${query}/`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSelectArtist = (artistName, artistId) => {
        setSearchQuery(artistName);
        setSelectedArtistId(artistId);
        setSearchResults([]);
        console.log('Selected artist:', { name: artistName, id: artistId });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.get(`/api/get-artist-info/${selectedArtistId}/`);
            onRequestArtistInfo(response.data); // Passa as informações do artista para a função onRequestArtistInfo
        } catch (error) {
            console.error('Error fetching artist info:', error);
        }
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search for artists..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(artist => (
                        <li key={artist.id} onClick={() => handleSelectArtist(artist.name, artist.id)} style={{ cursor: 'pointer' }}>
                            {artist.name}
                        </li>
                    ))}
                </ul>
            )}
            <SubmitButton onClick={handleSubmit} />
        </div>
    );
}

export default SearchArtistForm;
