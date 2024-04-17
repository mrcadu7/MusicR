import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaylistsCard from "../content/PlaylistsCard";

function Playlists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const response = await axios.get('/playlists/playlists/view/all/');
                console.log(response.data.results);
                setPlaylists(response.data.results);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        }

        fetchPlaylists();
    }, []);

    return (
        <div>
            <h1>Playlists</h1>
            <div className="row">
                {playlists.map(playlist => (
                    <div key={playlist.id} className="col-md-3" style={{ marginBottom: '20px' }}>
                        <PlaylistsCard key={playlist.id} playlist={playlist} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlists;
