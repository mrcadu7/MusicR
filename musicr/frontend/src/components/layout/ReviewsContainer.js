import React, { useState, useEffect } from 'react';
import ReviewList from "../content/ReviewList";
import styles from "./ReviewsContainer.module.css";
import axios from 'axios';
import ReviewListButtons from "../layout/ReviewListButtons";

function ReviewsContainer() {
    const [userReviews, setUserReviews] = useState([]);
    const [socialReviews, setSocialReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviewType, setReviewType] = useState('song');
    const userId = '1'; //lidar com isso depois

    useEffect(() => {
        const fetchReviews = async (type, userId) => {
            setLoading(true);
            setError(null);
            try {
                let response;
                if (userId) {
                    response = await axios.get(`/playlists/${type}-reviews/by-user/${userId}/`);
                } else {
                    response = await axios.get(`/playlists/${type}-reviews/view/all/`);
                }
                return response.data;
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews. Please try again later.');
                return [];
            } finally {
                setLoading(false);
            }
        };

        const fetchAllReviews = async () => {
            const userReviewsData = await fetchReviews(reviewType, userId);
            let socialReviewsData;

            if (userId) {
                const response = await fetchReviews(reviewType);
                socialReviewsData = response.results.reverse().slice(0, 10);
            }

            setUserReviews(userReviewsData ? userReviewsData.reverse().slice(0, 10) : []);
            setSocialReviews(socialReviewsData || []);
        };
    
        fetchAllReviews();
    }, [userId, reviewType]);

    return (
        <div className={styles.modernReviewsPage}>
            {/* Modern Header */}
            <header className={styles.reviewsHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.pageTitle}>
                        Your Musical <span className={styles.gradientText}>Reviews</span>
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Explore your thoughts and discover what the community thinks about music
                    </p>
                </div>
                
                {/* Animated Background */}
                <div className={styles.animatedBg}>
                    <div className={styles.gradientOrb1}></div>
                    <div className={styles.gradientOrb2}></div>
                </div>
            </header>

            {/* Review Type Toggle */}
            <div className={styles.toggleSection}>
                <ReviewListButtons
                    handleToggleReviewType={setReviewType}
                    reviewType={reviewType}
                />
            </div>

            {/* Main Content */}
            <div className={styles.reviewsContainer}>
                {error && (
                    <div className={styles.errorMessage}>
                        <p>{error}</p>
                    </div>
                )}
                
                <div className={styles.reviewsSections}>
                    <ReviewList
                        listName="SEUS REVIEWS"
                        reviews={userReviews}
                        loading={loading}
                        error={error}
                    />
                    <ReviewList
                        listName="SOCIAL"
                        reviews={socialReviews}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReviewsContainer;