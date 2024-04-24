import StarChange from "../layout/StarChange";

function AlbumCard({ album, openModal }) {
    return (
        <div className="card" style={{ width: '200px' }}>
            <img src={album.image_url || 'https://via.placeholder.com/200'} className="card-img-top" alt="Album" />
            <div className="card-body">
                <h5 className="card-title">{album.name || 'Nome album'}</h5>
                <StarChange value={album.average_rating} />
                <p className="card-text">Data de Lançamento: {album.release_date}</p>
                <button className="btn btn-primary" onClick={openModal}>Ver Músicas</button>
            </div>
        </div>
    );
}

export default AlbumCard;
