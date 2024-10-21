import React, { useState } from 'react';
import './Services.css'; // Подключение стилей

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState([
        { name: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)', price: '$70' },
        { name: 'Microdermabrasion', price: '$85' },
        { name: 'Skin Rejuvenation Treatments', price: '$90' },
        { name: 'Anti-Cellulite Treatments', price: '$120' },
        { name: 'Microneedling', price: '$75' },
        { name: 'Botox and Fillers', price: '$80' },
        { name: 'Eyebrow and Eyelash Tinting', price: '$95' },
        { name: 'Chemical Peels (Glycolic, Salicylic, TCA)', price: '$105' }
    ]);

    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');
    const [newServiceBenefits, setNewServiceBenefits] = useState('');
    const [newServiceContraindications, setNewServiceContraindications] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');
    const [newServicePhoto, setNewServicePhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Для отображения ошибок

    const handleAddService = () => {
        // Валидация: проверяем, чтобы все обязательные поля были заполнены
        if (!newServiceName || !newServiceDescription || !newServiceBenefits || !newServiceContraindications || !newServicePrice) {
            setErrorMessage('All fields are required. Please fill out all the fields.');
            return;
        }

        const newService = {
            name: newServiceName,
            description: newServiceDescription,
            benefits: newServiceBenefits,
            contraindications: newServiceContraindications,
            price: newServicePrice,
            photo: newServicePhoto ? URL.createObjectURL(newServicePhoto) : null
        };

        setServices([...services, newService]);
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServiceBenefits('');
        setNewServiceContraindications('');
        setNewServicePrice('');
        setNewServicePhoto(null);
        setErrorMessage(''); // Очищаем сообщение об ошибке
        setIsModalOpen(false);
    };

    const handleFileChange = (e) => {
        setNewServicePhoto(e.target.files[0]);
    };

    return (
        <div className="services-page">
            {/* Кнопка добавления услуги */}
            <div className="add-service-container">
                <button className="add-service-btn" onClick={() => setIsModalOpen(true)}>
                    Add new service
                </button>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-item" key={index}>
                        <span>{service.name}</span>
                        <span>{service.price}</span>
                    </div>
                ))}
            </div>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-left">
                            {/* Изображение услуги */}
                            {newServicePhoto && (
                                <img src={URL.createObjectURL(newServicePhoto)} alt="Service" className="service-image" />
                            )}
                        </div>
                        <div className="modal-right">
                            <h3>Add New Service</h3>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <input
                                type="text"
                                placeholder="Service Name"
                                value={newServiceName}
                                onChange={(e) => setNewServiceName(e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={newServiceDescription}
                                onChange={(e) => setNewServiceDescription(e.target.value)}
                            />
                            <textarea
                                placeholder="Benefits"
                                value={newServiceBenefits}
                                onChange={(e) => setNewServiceBenefits(e.target.value)}
                            />
                            <textarea
                                placeholder="Contraindications"
                                value={newServiceContraindications}
                                onChange={(e) => setNewServiceContraindications(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Service Price"
                                value={newServicePrice}
                                onChange={(e) => setNewServicePrice(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button onClick={handleAddService}>Add Service</button>
                            <button onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
