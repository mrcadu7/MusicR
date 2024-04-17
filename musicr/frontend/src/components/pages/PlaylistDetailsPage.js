import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '../layout/Container';

function PlaylistDetailsPage() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);

    // Função para formatar a duração
    const formatDuration = (duration) => {
        // Dividir a duração em horas, minutos e segundos
        const [hours, minutes, seconds] = duration.split(':');
    
        // Remover os zeros à esquerda e converter para números inteiros
        const formattedHours = parseInt(hours);
        const formattedMinutes = parseInt(minutes);
        const formattedSeconds = parseInt(seconds);
    
        // Verificar se há horas e formatar de acordo
        const formattedHoursPart = formattedHours > 0 ? `${formattedHours}:` : '';
    
        // Formatar os minutos e segundos com dois dígitos
        const formattedMinutesPart = formattedMinutes.toString().padStart(2, '0');
        const formattedSecondsPart = formattedSeconds.toString().padStart(2, '0');
    
        // Retornar a duração formatada
        return `${formattedHoursPart}${formattedMinutesPart}:${formattedSecondsPart}`;
    };

    useEffect(() => {
        async function fetchPlaylistDetails() {
            try {
                const response = await axios.get(`/playlists/playlists/view/${playlistId}/`);
                console.log(response.data);
                setPlaylist(response.data);
            } catch (error) {
                console.error('Error fetching playlist details:', error);
            }
        }

        fetchPlaylistDetails();
    }, [playlistId]);

    return (
        <div>
            {playlist && (
                <div>
                    <h1>{playlist.title}</h1>
                    <p>{playlist.description}</p>
                    <ul>
                        {playlist.song_details.map((song, index) => (
                            <li key={index}>{song.title} - {song.artist.name} - {song.album.title} - {formatDuration(song.duration)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PlaylistDetailsPage;
