function ArtistHeader({ artist }) {
    return (
        <div className="artist-header">
            <div className="artist-info">
                <img src={artist.image_url || 'https://via.placeholder.com/150'} alt={artist.name || 'Artist'} />
                <h3>{artist.name || 'Nome artista'}</h3>
            </div>
        </div>
    );
}

export default ArtistHeader;