import React, {useState} from 'react';
import './css/ReviewComponent/ReviewComponent.css';
import ReviewModal from "./ReviewModal";

const ReviewComponent = (props) => {
    const { name, rating, comment, date } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReadMore = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    console.log("ReviewComponent", props);

    return (
        <div className={"review-component"}>
            <div className={"review-header"}>
                <div className={"review-avatar"}>
                    <img src="" alt=""/>
                </div>
                <div className="review-title">
                    <h3>{name}</h3>
                    <div className="review-rating">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill={index < rating ? `#CCEA2E` : "none"}
                                stroke="#CCEA2E"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 .587l3.668 7.568L24 9.748l-6 5.857L19.336 24 12 19.847 4.664 24 6 15.605 0 9.748l8.332-1.593L12 .587z"/>
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
            <p>{comment}</p>
            <div className="review-footer">
                <button onClick={handleReadMore}>read more</button><br/>
                <span>{date}</span>
            </div>
            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} content={comment} />
        </div>
    );
};

export default ReviewComponent;