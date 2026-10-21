import "./ReviewCard.css";
import { useEffect, useState } from "react";
import type { Review, ReviewSummary } from "../types/Review";
import { getReviews, getReviewSummary } from "../reviewAPI";

interface Props {
    meetupId: number;
}

function renderStars(rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function ReviewCard({ meetupId }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [summary, setSummary] = useState<ReviewSummary | null>(null);

    useEffect(() => {
        getReviews(meetupId).then((data) => setReviews(data));
        getReviewSummary(meetupId).then((data) => setSummary(data));
    }, [meetupId]);

    return (
        <div className="review-card">
            <div className="review-header">
                <h2>Recensioner</h2>
                {summary && summary.totalReviews > 0 && (
                    <p className="review-average">
                        {renderStars(Math.round(summary.averageRating))}{" "}
                        {summary.averageRating.toFixed(1).replace(".", ",")} av 5
                    </p>
                )}
            </div>

            {reviews.length === 0 && <p>Inga recensioner än.</p>}

            {reviews.map((review) => (
                <div key={review.id} className="review-item">
                    <div className="review-item-top">
                        <strong>{review.authorName}</strong>
                        <span className="review-stars">{renderStars(review.rating)}</span>
                    </div>
                    {review.comment && <p>{review.comment}</p>}
                </div>
            ))}
        </div>
    );
}

export default ReviewCard;