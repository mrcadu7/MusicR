import React from 'react';

function AlbumCard({ openModal }) {
    return (
        <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Album" />
            <div className="card-body">
                <h5 className="card-title">Nome album</h5>
                <p className="card-text">Data de Lançamento:</p>
                <a href="#" className="btn btn-primary" onClick={openModal}>Ver Músicas</a>
            </div>
        </div>
    );
}

export default AlbumCard;
