import React from 'react';
import styles from './ReviewListButtons.module.css';

function ReviewListButtons({ handleToggleReviewType, reviewType }) {
    return (
        <div className={styles.buttonContainer}>
            <button onClick={() => handleToggleReviewType('song')} className={reviewType === 'song' ? styles.active : ''}>Músicas</button>
            <button onClick={() => handleToggleReviewType('album')} className={reviewType === 'album' ? styles.active : ''}>Álbuns</button>
        </div>
    );
}

export default ReviewListButtons;
