import { useState } from 'react';
import StarRate from '../layout/StarRate';


function MusicReviewForm ( {onSubmit} ) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingChange = (newValue) => {
        setRating(newValue);
    }

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ rating, review });
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label htmlFor="rating"></label>
                <StarRate value={rating} onChange={handleRatingChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea
                    className="form-control"
                    id="review"
                    rows="3"
                    placeholder="Talk about this song"
                    value={review}
                    onChange={handleReviewChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    )
    
}


export default MusicReviewForm