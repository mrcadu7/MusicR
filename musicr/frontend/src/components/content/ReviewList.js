// ReviewList.js
import React from 'react';
import StarRateReading from '../layout/StarRateReading';
import styles from './ReviewList.module.css';

function ReviewList({ listName, reviews, loading, error }) {
    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.text_container}>
            <section className={styles.dynamic_content}>
                <div className={styles.text_list}>
                    <h2>{listName}</h2>
                    <a href="/">
                        Ver todos
                    </a>
                    <ul className={styles.reviews}>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <p>{review.album ? `Álbum: ${review.album}` : `Música: ${review.song}`}</p>
                                <p><StarRateReading value={review.rating} /></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default ReviewList;
