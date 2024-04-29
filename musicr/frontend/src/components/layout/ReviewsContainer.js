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
        <div className={styles.container}>
            {error && <p>{error}</p>}
            <div className={styles.toggle}>
            <ReviewListButtons
                handleToggleReviewType={setReviewType}
                reviewType={reviewType}
            />
            </div>
            <ReviewList
                listName="Seus reviews"
                reviews={userReviews}
                loading={loading}
            />
            <ReviewList
                listName="Social"
                reviews={socialReviews}
                loading={loading}
            />
        </div>
    );
}

export default ReviewsContainer;