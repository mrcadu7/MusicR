import React from 'react';
import PropTypes from 'prop-types';

function SubmitButtonMusic({ track, playlists, onSelect }) {
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Add
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {playlists.results.map((playlist) => (
                    <li key={playlist.id}>
                        <button className="dropdown-item" onClick={() => onSelect(playlist.id, track)}>
                            {playlist.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

SubmitButtonMusic.propTypes = {
    track: PropTypes.object.isRequired,
    playlists: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default SubmitButtonMusic;
