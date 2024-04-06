// SubmitButton.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.css';

function SubmitButton({ onClick }) {
    return (
        <div className="d-grid gap-2 col-6 mx-auto">
            <button className={`btn btn-primary btn-lg ${styles.btn}`} onClick={onClick}>
                Pesquisar
            </button>
        </div>
    );
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
