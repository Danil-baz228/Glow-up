import React from 'react';
import './css/ReviewComponent/ReviewModal.css';

const ReviewModal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <div>{content}</div>
            </div>
        </div>
    );
};

export default ReviewModal;