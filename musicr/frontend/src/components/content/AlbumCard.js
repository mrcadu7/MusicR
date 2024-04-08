import React from 'react';

function AlbumCard({ album, openModal }) {
    return (
        <div className="card">
            <img src={album.image_url || 'https://via.placeholder.com/150'} className="card-img-top" alt="Album" />
            <div className="card-body">
                <h5 className="card-title">{album.name || 'Nome album'}</h5>
                <p className="card-text">Data de Lançamento: {album.release_date}</p> {/* Exibe a data de lançamento do álbum */}
                <button className="btn btn-primary" onClick={openModal}>Ver Músicas</button>
            </div>
        </div>
    );
}

export default AlbumCard;
