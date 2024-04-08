import { useState } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton'; // Importe o componente SubmitButton

function SearchArtistForm({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(null); // Adicione o estado para armazenar o ID do artista selecionado
    const [selectedArtistName, setSelectedArtistName] = useState('');
    
    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        try {
            const response = await axios.get(`/spotify/search-artists/${query}/`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSelectArtist = (artistName, artistId) => {
        setSearchQuery(artistName);
        setSelectedArtistId(artistId); // Atualize o estado com o ID do artista selecionado
        setSearchResults([]); // Limpar sugestões após seleção
        console.log('Selected artist:', { name: artistName, id: artistId });
        setSelectedArtistName(artistName);
    };

    const handleSubmit = () => {
        // Verifique se há um artista selecionado
        if (selectedArtistId) {
            // Faça a requisição para obter informações do artista
            axios.get(`/spotify/get-artist-info/${selectedArtistId}/`)
                .then(response => {
                    onSubmit({ ...response.data, name: selectedArtistName });
                    console.log('Artist info:', response.data);
                })
                .catch(error => {
                    console.error('Error fetching artist info:', error);
                });
        } else {
            console.warn('Nenhum artista selecionado.');
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
            <SubmitButton onClick={handleSubmit} /> {/* Passar a função handleSubmit para o SubmitButton */}
        </div>
    );
}

export default SearchArtistForm;
