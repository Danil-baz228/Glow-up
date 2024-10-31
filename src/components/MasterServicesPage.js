import React, { useState, useEffect } from 'react';
import styles from './css/MasterPage/MasterServicesPage.module5.css';
import img from '../icons/free-icon-font-add-image-13727345.png';

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFourthModalOpen, setIsFourthModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('$');

    const [services, setServices] = useState(() => {
        const savedServices = localStorage.getItem('services');
        return savedServices ? JSON.parse(savedServices) : [
            { name: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)', description: 'Facial treatments ...', benefits: 'Anti-aging...', contraindications: 'Not recommended...', price: '$70', photo: null },
            { name: 'Microdermabrasion', description: 'Microdermabrasion...', benefits: 'Exfoliation...', contraindications: 'Avoid if ...', price: '$85', photo: null },
            { name: 'QQQQQQ', description: 'Facial treatments ...', benefits: 'Anti-aging...', contraindications: 'Not recommended...', price: '$70', photo: null },
            { name: 'Microdermabrasion', description: 'Microdermabrasion...', benefits: 'Exfoliation...', contraindications: 'Avoid if ...', price: '$85', photo: null },
            { name: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)', description: 'Facial treatments ...', benefits: 'Anti-aging...', contraindications: 'Not recommended...', price: '$70', photo: null },
            { name: 'Microdermabrasion', description: 'Microdermabrasion...', benefits: 'Exfoliation...', contraindications: 'Avoid if ...', price: '$85', photo: null },
            { name: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)', description: 'Facial treatments ...', benefits: 'Anti-aging...', contraindications: 'Not recommended...', price: '$70', photo: null },
            { name: 'Microdermabrasion', description: 'Microdermabrasion...', benefits: 'Exfoliation...', contraindications: 'Avoid if ...', price: '$85', photo: null },
            { name: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)', description: 'Facial treatments ...', benefits: 'Anti-aging...', contraindications: 'Not recommended...', price: '$70', photo: null },
            { name: 'Microdermabrasion', description: 'Microdermabrasion...', benefits: 'Exfoliation...', contraindications: 'Avoid if ...', price: '$85', photo: null },
      
      
        ];
    });

    useEffect(() => {
        localStorage.setItem('services', JSON.stringify(services));
    }, [services]);

    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');
    const [newServiceBenefits, setNewServiceBenefits] = useState('');
    const [newServiceContraindications, setNewServiceContraindications] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');
    const [newServicePhoto, setNewServicePhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const convertPrice = (price, currency) => {
        const priceValue = parseFloat(price.replace(/[^\d.-]/g, ''));
        if (currency === 'UA') return `UA ${priceValue * 41}`;
        if (currency === 'EUR') return `€ ${(priceValue * 0.85).toFixed(2)}`;
        return `$${priceValue}`;
    };

    const handleAddService = () => {
        if (!newServiceName || !newServiceDescription || !newServiceBenefits || !newServiceContraindications || !newServicePrice) {
            setErrorMessage('All fields are required. Please fill out all the fields.');
            return;
        }

        const newService = {
            name: newServiceName,
            description: newServiceDescription,
            benefits: newServiceBenefits,
            contraindications: newServiceContraindications,
            price: convertPrice(newServicePrice, selectedCurrency),
            photo: newServicePhoto ? URL.createObjectURL(newServicePhoto) : null
        };

        setServices([...services, newService]);
        resetForm();
        setIsModalOpen(false);
        setIsFourthModalOpen(false);
    };

    const handleEditService = (service) => {//изменение сервисов
        setSelectedService(service);
        setNewServiceName(service.name);
        setNewServiceDescription(service.description);
        setNewServiceBenefits(service.benefits);
        setNewServiceContraindications(service.contraindications);
        setNewServicePrice(service.price);
        setIsFourthModalOpen(true);
    };

    const handleUpdateService = () => {
        const updatedService = {
            name: newServiceName,
            description: newServiceDescription,
            benefits: newServiceBenefits,
            contraindications: newServiceContraindications,
            price: convertPrice(newServicePrice, selectedCurrency),
            photo: selectedService.photo
        };

        const updatedServices = services.map(service =>
            service.name === selectedService.name ? updatedService : service
        );

        setServices(updatedServices);
        resetForm();
        setSelectedService(null);
        setIsFourthModalOpen(false);
    };

    const resetForm = () => {
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServiceBenefits('');
        setNewServiceContraindications('');
        setNewServicePrice('');
        setNewServicePhoto(null);
        setErrorMessage('');
    };

    const handleFileChange = (e) => {
        setNewServicePhoto(e.target.files[0]);
        setIsFourthModalOpen(true);
    };

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    const handleDeleteService = (serviceName) => {
        const updatedServices = services.filter(service => service.name !== serviceName);
        setServices(updatedServices);
        setSelectedService(null);
    };

    return (
        <div className={styles.ImagegridContainer}>
            <div className="services-page">
                <div className="add-service-container">
                    <button className="add-service-btn" onClick={() => setIsModalOpen(true)}>
                        Add new service
                    </button>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-item" key={index} onClick={() => handleServiceClick(service)}>
                            <span>{service.name}</span>
                            <span>{service.price}</span>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="modal1-overlay">
                        <div className="modal1-content">
                            <div className="modal1-header">
                                <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                                    &times;
                                </button>
                                <h2>Create Post</h2>
                            </div>
                            <div className="modal1-body">
                                <div className="modal1-icon">
                                    <img src={img} alt="Create post icon" />
                                </div>
                                <label htmlFor="file-input" className="select-photo">
                                    Select photo from computer
                                </label>
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedService && (
                    <div className="modal5-overlay">
                        <div className="modal5-content">
                            <div className="modal5-header">
                                <button className="close-modal-btn" onClick={() => setSelectedService(null)}>
                                    &times;
                                </button>
                                <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{selectedService.name}</h2>
                            </div>
                            <div className="modal5-body">
                                <div className="modal5-left">
                                    {selectedService.photo ? (
                                        <img src={selectedService.photo} alt="Service" />
                                    ) : (
                                        <img src={img} alt="No photo available" />
                                    )}
                                </div>
                                <div className="modal5-right">
                                    <p><strong>Description:</strong> {selectedService.description}</p>
                                    <p><strong>Benefits:</strong> {selectedService.benefits}</p>
                                    <p><strong>Contraindications:</strong> {selectedService.contraindications}</p>
                                    <p><strong>Price:</strong> {selectedService.price}</p></div>
                                    
                            </div>
                                    <button className="delete-service-btn" onClick={() => handleDeleteService(selectedService.name)}>
                                        Delete Service
                                    </button>
                                   
                                    <button className="edit11-service-btn" onClick={() => handleEditService(selectedService)}>
                                        Edit Service
                                    </button>
                        </div>
                        
                    </div>
                )}

                {isFourthModalOpen && (
                    <div className="modal4-overlay">
                        <div className="modal4-content">
                            <div className="modal4-header">
                                <button className="close-modal-btn" onClick={() => setIsFourthModalOpen(false)}>
                                    &times;
                                </button>
                                <h3>{selectedService ? 'Edit Service' : 'Add New Service'}</h3>
                            </div>
                            <div className="modal4-body">
                                <div className="left-side">
                                    <label>Headline</label>
                                    <textarea
                                        type="text"
                                        placeholder="Enter headline"
                                        value={newServiceName}
                                        onChange={(e) => setNewServiceName(e.target.value)}
                                    />
                                    <div className="image-preview1">
                                        {newServicePhoto && <img src={URL.createObjectURL(newServicePhoto)} alt="Selected" />}
                                    </div>
                                </div>
                                <div className="right-side">
                                    <label>Description</label>
                                    <textarea
                                        placeholder=""
                                        value={newServiceDescription}
                                        onChange={(e) => setNewServiceDescription(e.target.value)}
                                    />
                                    <label>Benefits</label>
                                    <textarea
                                        placeholder=""
                                        value={newServiceBenefits}
                                        onChange={(e) => setNewServiceBenefits(e.target.value)}
                                    />
                                    <label>Contraindications</label>
                                    <textarea
                                        placeholder=""
                                        value={newServiceContraindications}
                                        onChange={(e) => setNewServiceContraindications(e.target.value)}
                                    />
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={newServicePrice}
                                        onChange={(e) => setNewServicePrice(e.target.value)}
                                    />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                </div>
                            </div>
                            <div className="modal4-footer">
                                <button className="save-btn" onClick={selectedService ? handleUpdateService : handleAddService}>
                                    {selectedService ? 'Update Service' : 'Add Service'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
