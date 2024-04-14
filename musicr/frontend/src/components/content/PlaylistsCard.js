
function PlaylistsCard() {
    return (
        <div className="card">
            <img src='https://via.placeholder.com/150' className="card-img-top" alt="Playlist" />
            <div className="card-body">
                <h5 className="card-title">Nome da playlist</h5>
                <p className="card-text">Criado em: </p> 
            </div>
        </div>
    );
}

export default PlaylistsCard;