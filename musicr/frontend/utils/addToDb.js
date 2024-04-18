import getCookie from "./csfr";

const csrftoken = getCookie('csrftoken');

async function addToDb({ songId, artistId, artistName, albumId, albumName, albumReleaseDate, songTitle, songDuration }) {
    try {

        const artistRequestBody = {
            name: artistName,
            artist_id: artistId,
        };

        const albumRequestBody = {
            artist: artistId,
            title: albumName,
            release_date: albumReleaseDate,
            album_id: albumId,
        };

        const songRequestBody = {
            artist: artistId,
            album: albumId,
            title: songTitle,
            duration: songDuration,
            song_id: songId
        };

        
        console.log('Dados recebidos para adicionar ao banco de dados:', {
            songId,
            artistId,
            artistName,
            albumId,
            albumName,
            albumReleaseDate,
            songTitle,
            songDuration,
        });

        const [songExists, albumExists, artistExists] = await Promise.all([
            fetch(`/playlists/songs/exists/${songId}/`).then(res => res.json()).then(data => data.exists),
            fetch(`/playlists/albums/exists/${albumId}/`).then(res => res.json()).then(data => data.exists),
            fetch(`/playlists/artists/exists/${artistId}/`).then(res => res.json()).then(data => data.exists)
        ]);

        if (!songExists) {
            if (!albumExists) {
                if (!artistExists) {
                    await fetchAndHandleError(`/playlists/artists/create/`, artistRequestBody);
                }
                await fetchAndHandleError(`/playlists/albums/create/`, albumRequestBody);
            }
            await fetchAndHandleError(`/playlists/songs/create/`, songRequestBody);
        }
    } catch (error) {
        console.error('Erro ao adicionar à base de dados:', error);
    }
}

async function fetchAndHandleError(url, body) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(body),
    });
}

export default addToDb;
