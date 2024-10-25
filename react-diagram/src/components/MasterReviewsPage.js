import React from 'react';
import './css/MasterPage/MasterReviewsPage.css'; // Add your custom CSS styles here

// Dummy data to represent reviews and statistics
const reviewsData = [
    {
        id: 1,
        name: "Anna Koval",
        service: "Chemical Peels (Glycolic, Salicylic, TCA)",
        rating: 5,
        comment: "I recently had a chemical peel treatment, and I'm thrilled with the results! I chose a combination of glycolic, salicylic, and TCA peels to address my skin concerns, and the outcome has been fantastic. My skin feels smooth...",
        images: ['path/to/image1.png', 'path/to/image2.png'], // Replace with actual paths to images
    },
    {
        id: 2,
        name: "Anna Koval",
        service: "Chemical Peels (Glycolic, Salicylic, TCA)",
        rating: 5,
        comment: "Absolutely amazing experience! The service was professional and the results exceeded my expectations. Highly recommend! Truly the best in town...",
        images: ['path/to/image3.png'],
    },
];

const averageReviewStats = {
    averageRating: 4.9,
    totalReviews: 18,
    starBreakdown: {
        5: 15,
        4: 2,
        3: 1,
        2: 0,
        1: 0
    },
    qualityOfWork: 80,
    levelOfService: 96,
    comfortAtmosphere: 77,
    hygieneSafety: 94,
};

const StarRating = ({ rating }) => {
    return (
        <div className="starRating">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? 'filledStar' : 'emptyStar'}>
                    ★
                </span>
            ))}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <div className="reviewCard">
            <div className="reviewHeader">
                <div className="reviewerName">{review.name}</div>
                <StarRating rating={review.rating} />
            </div>
            <div className="serviceName">{review.service}</div>
            <div className="reviewComment">{review.comment}</div>
            <div className="reviewImages">
                {review.images.map((image, index) => (
                    <img key={index} src={image} alt="Review" className="reviewImage" />
                ))}
                {review.images.length > 1 && <div className="moreImages">+{review.images.length - 1}</div>}
            </div>
        </div>
    );
};

const ReviewStats = ({ stats }) => {
    return (
        <div className="reviewStats">
            <div className="averageRating">
                <span className="ratingNumber">{stats.averageRating}</span>
                <StarRating rating={Math.round(stats.averageRating)} />
                <span className="totalReviews">{stats.totalReviews} reviews</span>
            </div>
            <div className="ratingBreakdown">
                {Object.keys(stats.starBreakdown).map((star, i) => (
                    <div key={i} className="ratingRow">
                        <span>{star} ★</span>
                        <div className="ratingBar">
                            <div style={{ width: `${(stats.starBreakdown[star] / stats.totalReviews) * 100}%` }}></div>
                        </div>
                        <span>{stats.starBreakdown[star]}</span>
                    </div>
                ))}
            </div>
            <div className="extraStats">
                <div className="extraStat">
                    <span>Quality of Work</span>
                    <div className="progressBar">
                        <div style={{ width: `${stats.qualityOfWork}%` }}></div>
                    </div>
                </div>
                <div className="extraStat">
                    <span>Level of Service</span>
                    <div className="progressBar">
                        <div style={{ width: `${stats.levelOfService}%` }}></div>
                    </div>
                </div>
                <div className="extraStat">
                    <span>Comfort and Atmosphere</span>
                    <div className="progressBar">
                        <div style={{ width: `${stats.comfortAtmosphere}%` }}></div>
                    </div>
                </div>
                <div className="extraStat">
                    <span>Hygiene and Safety</span>
                    <div className="progressBar">
                        <div style={{ width: `${stats.hygieneSafety}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReviewsPage = () => {
    return (
        <div className="reviewsPage">
            <ReviewStats stats={averageReviewStats} />
            <div className="reviewsList">
                {reviewsData.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
