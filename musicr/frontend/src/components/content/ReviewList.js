// ReviewList.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRateReading from '../layout/StarRateReading';
import styles from './ReviewList.module.css';

function ReviewList({ listName, reviews, loading, error }) {
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = (review) => {
        setSelectedReview(review);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedReview(null);
        setShowModal(false);
    };

    const getPreviewText = (text, maxLength = 100) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className={styles.modernContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{listName}</h2>
                </div>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Carregando reviews...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.modernContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{listName}</h2>
                </div>
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.modernContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{listName}</h2>
                    <a href="/" className={styles.viewAllLink}>
                        Ver todos
                        <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
                
                <div className={styles.reviewsGrid}>
                    {reviews && reviews.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🎵</div>
                            <p className={styles.emptyText}>Nenhum review encontrado</p>
                            <p className={styles.emptySubtext}>Comece criando seu primeiro review!</p>
                        </div>
                    ) : (                        reviews && reviews.map((review) => (
                            <div 
                                key={review.id || `${review.song_details?.id || review.album_details?.id}-${review.created_at}`} 
                                className={styles.reviewCard}
                                onClick={() => openModal(review)}
                                onKeyDown={(e) => e.key === 'Enter' && openModal(review)}
                                role="button"
                                tabIndex={0}
                            >
                                <div className={styles.cardContent}>
                                    <div className={styles.reviewInfo}>
                                        <h3 className={styles.reviewTitle}>
                                            {review.album_details ? review.album_details.title : review.song_details.title}
                                        </h3>
                                        {review.album_details && (
                                            <p className={styles.artistName}>{review.album_details.artist}</p>
                                        )}
                                        {review.song_details && (
                                            <p className={styles.artistName}>{review.song_details.artist}</p>
                                        )}
                                    </div>
                                    <div className={styles.ratingContainer}>
                                        <StarRateReading value={review.rating} />
                                        <span className={styles.ratingValue}>{review.rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <div className={styles.cardFooter}>
                                    {review.review_text && (
                                        <p className={styles.reviewText}>
                                            {getPreviewText(review.review_text, 80)}
                                        </p>
                                    )}
                                    <div className={styles.reviewMeta}>
                                        <span className={styles.reviewDate}>
                                            {new Date(review.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                        {review.review_text && review.review_text.length > 80 && (
                                            <span className={styles.readMoreIndicator}>Clique para ler mais</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>            {/* Modal de Review Completo */}
            {showModal && selectedReview && (
                <div 
                    className={styles.reviewModalOverlay} 
                    onClick={closeModal}
                    onKeyDown={(e) => e.key === 'Escape' && closeModal()}
                    role="dialog"
                    tabIndex={-1}
                >
                    <div 
                        className={styles.reviewModal} 
                        onClick={(e) => e.stopPropagation()}
                        role="document"
                    >
                        <div className={styles.reviewModalContent}>
                            <div className={styles.reviewModalHeader}>
                                <div className={styles.reviewModalInfo}>
                                    <h2 className={styles.reviewModalTitle}>
                                        {selectedReview.album_details ? selectedReview.album_details.title : selectedReview.song_details.title}
                                    </h2>
                                    <p className={styles.reviewModalArtist}>
                                        {selectedReview.album_details ? selectedReview.album_details.artist : selectedReview.song_details.artist}
                                    </p>
                                    <div className={styles.reviewModalRating}>
                                        <StarRateReading value={selectedReview.rating} />
                                        <span className={styles.reviewModalRatingValue}>
                                            {selectedReview.rating.toFixed(1)} / 5
                                        </span>
                                    </div>
                                </div>
                                <button className={styles.closeModalBtn} onClick={closeModal}>
                                    ×
                                </button>
                            </div>
                            
                            {selectedReview.review_text && (
                                <div className={styles.reviewModalBody}>
                                    <p className={styles.reviewModalText}>
                                        {selectedReview.review_text}
                                    </p>
                                </div>
                            )}
                            
                            <div className={styles.reviewModalFooter}>
                                <span className={styles.reviewModalDate}>
                                    {new Date(selectedReview.created_at).toLocaleDateString('pt-BR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                <div className={styles.reviewModalActions}>
                                    <button className={styles.actionBtn}>
                                        Curtir
                                    </button>
                                    <button className={styles.actionBtn}>
                                        Compartilhar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

ReviewList.propTypes = {
    listName: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string
};

ReviewList.defaultProps = {
    reviews: [],
    loading: false,
    error: null
};

export default ReviewList;
