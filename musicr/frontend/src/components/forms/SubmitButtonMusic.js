// SubmitButton.js
import React from 'react';
import PropTypes from 'prop-types';

function SubmitButtonMusic({ trackId, onClick }) {
    return (
        <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary" onClick={onClick}>
                Add
            </button>
        </div>
    );
}

SubmitButtonMusic.propTypes = {
    trackId: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SubmitButtonMusic;
