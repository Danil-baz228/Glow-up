import React, { useEffect, useState } from 'react';
import './css/HomePage/HomePageReviews.css';

const HomePageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected an array');
        }
       
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getCircleColor = (index) => {
    const colors = ['circle-female', 'circle-male', 'circle-female', 'circle-male'];
    return colors[index % colors.length];
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const maxPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % maxPages);
  };

  return (
    <div className="homepage-reviews-container">
      <h2 className="homepage-reviews-title">Reviews</h2>
      <div className="homepage-reviews-grid">
        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage).map((review, index) => (
            <div key={review.review_id} className="homepage-review-item-grid">
              <div className={`homepage-review-avatar-container ${getCircleColor(index)}`}>
                  <div className="homepage-review-avatar">
                    <div className="homepage-review-initials">
                      {getInitials(review.client.first_name, review.client.last_name)}
                    </div>
                  </div>

              </div>
              <div className="homepage-review-name">{review.client.first_name} {review.client.last_name}</div>
              <div className="homepage-review-stars">{renderStars(review.rating)}</div>
              <div className="homepage-review-comment">{review.comment}</div>
            </div>
          ))
        )}
      </div>
      {maxPages > 1 && (
        <div className="homepage-review-navigation">
          {[...Array(maxPages)].map((_, index) => (
            <span
              key={index}
              className={`homepage-nav-dot ${currentPage === index ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
            />
          ))}
          <button className="homepage-next-button" onClick={handleNextPage}>
            <div className="homepage-next-button-circle">
              <span className="homepage-next-button-arrow">➜</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePageReviews;