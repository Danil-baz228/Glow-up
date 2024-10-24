import React, { useState } from 'react';
import "./css/MasterPage/NewPortfolioModal.css";

const NewPortfolioModal = ({ onClose, onAdd }) => {
    const [newItem, setNewItem] = useState({ name: '', description: '', imageUrl: '' });

    const handleSubmit = () => {
        if (newItem.name && newItem.description && newItem.imageUrl) {
            onAdd(newItem);
        }
    };

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <div className="modalHeader">
                    <button className="closeButton" onClick={onClose}>×</button>
                    <h2>Create a post</h2>
                </div>
                <div className="modalBody">
                    <div className="imageSection">
                        <img src={newItem.imageUrl || '/images/default.jpg'} alt="Preview" className="previewImage" />
                    </div>
                    <div className="formSection">
                        <label>Headline</label>
                        <input
                            type="text"
                            placeholder="Headline"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <label>Description</label>
                        <textarea
                            placeholder="Description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            maxLength={300}
                        />
                        <div className="formFooter">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const imageUrl = URL.createObjectURL(file);
                                        setNewItem({ ...newItem, imageUrl });
                                    }
                                }}
                            />
                            <button className="addButton" onClick={handleSubmit}>
                                Add to portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPortfolioModal;
