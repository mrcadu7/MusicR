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

        const [songResponse, albumResponse, artistResponse] = await Promise.all([
            fetch(`/playlists/songs/view/${songId}/`),
            fetch(`/playlists/albums/view/${albumId}/`),
            fetch(`/playlists/artists/view/${artistId}/`)
        ]);

        if (!songResponse.ok) {
            if (!albumResponse.ok) {
                if (!artistResponse.ok) {
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
