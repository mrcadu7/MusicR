import { Link } from 'react-router-dom';

function PlaylistsCard({playlist}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="card" style={{ width: '200px' }}>
            <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: 'none' }}>
                <img src={playlist.image_url || 'https://via.placeholder.com/150'} className="card-img-top" alt="Playlist" />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{playlist.title || ''}</h5>
                <p className="card-text">{formatDate(playlist.created_at) || ''}</p> 
            </div>
        </div>
    );
}

export default PlaylistsCard;