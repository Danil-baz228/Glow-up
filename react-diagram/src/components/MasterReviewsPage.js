import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/MasterPage/MasterReviewsPage.css';

const StarRating = ({ rating }) => (
    <div className="starRating">
        {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'filledStar' : 'emptyStar'}>★</span>
        ))}
    </div>
);

const ReviewCard = ({ review }) => (
    <div className="reviewCard">
        <div className="reviewHeader">
            <div className="reviewerName">{review.client.first_name} {review.client.last_name}</div>
            <StarRating rating={review.rating} />
        </div>
        <div className="reviewComment">{review.comment}</div>
        <div className="reviewDate">{new Date(review.date).toLocaleDateString()}</div>
    </div>
);

const ReviewStats = ({ stats }) => (
    <div className="reviewStats">
        <div className="averageRating">
            <span className="ratingNumber">{stats.averageRating.toFixed(1)}</span>
            <StarRating rating={Math.round(stats.averageRating)} />
            <span className="totalReviews">{stats.totalReviews} reviews</span>
        </div>
        {/* Остальная часть статистики, например, breakdown по звездам */}
    </div>
);

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [averageReviewStats, setAverageReviewStats] = useState({
        averageRating: 0,
        totalReviews: 0,
    });

    useEffect(() => {
        // Получение данных отзывов
        axios.get('http://localhost:5000/api/reviews')
            .then(response => {
                const data = response.data;
                setReviews(data);

                // Рассчитываем средний рейтинг и общее количество
                const totalReviews = data.length;
                const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
                setAverageReviewStats({ averageRating, totalReviews });
            })
            .catch(error => {
                console.error("Ошибка при загрузке отзывов: ", error);
            });
    }, []);

    return (
        <div className="reviewsPage">
            <ReviewStats stats={averageReviewStats} />
            <div className="reviewsList">
                {reviews.map((review) => (
                    <ReviewCard key={review.review_id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
