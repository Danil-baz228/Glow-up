import React, { useState } from 'react';
import "./css/MasterPage/NewServiceModal.css";

const NewServiceModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        headline: "",
        description: "",
        benefits: "",
        contraindications: "",
        price: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData); // Передаем введенные данные обратно в родительский компонент
    };

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={onClose}>X</button>
                <h2>Add New Service</h2>
                <form onSubmit={handleSubmit} className="newServiceForm">
                    <div className="formGroup">
                        <label>Headline</label>
                        <input
                            type="text"
                            name="headline"
                            value={formData.headline}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label>Benefits</label>
                        <textarea
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Contraindications</label>
                        <textarea
                            name="contraindications"
                            value={formData.contraindications}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submitButton">Add to services</button>
                </form>
            </div>
        </div>
    );
};

export default NewServiceModal;
