import React from 'react';
import './css/ModalBlog.css';

const Modal = ({ title, image, description, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                <img src={image} alt={title} className="modal-image" />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Modal;
