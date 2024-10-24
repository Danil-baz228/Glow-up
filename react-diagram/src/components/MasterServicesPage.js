import React, { useState,useEffect } from 'react';
import './css/MasterPage/MasterServicesPage.css';
import img from '../icons/free-icon-font-add-image-13727345.png';
const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);  // Для первого окна
    const [isFourthModalOpen, setIsFourthModalOpen] = useState(false); // Для четвертого окна
    const [selectedService, setSelectedService] = useState(null); // Для пятого окна
    const [selectedCurrency, setSelectedCurrency] = useState('$');

    // Загружаем услуги из localStorage при монтировании
    const [services, setServices] = useState(() => {
        const savedServices = localStorage.getItem('services');
        return savedServices ? JSON.parse(savedServices) : [
            { name: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)', description: 'Facial treatments ...', benefits: 'Anti-aging...', contraindications: 'Not recommended...', price: '$70', photo: null },
            { name: 'Microdermabrasion', description: 'Microdermabrasion...', benefits: 'Exfoliation...', contraindications: 'Avoid if ...', price: '$85', photo: null },
            // Добавить остальные услуги
        ];
    });

    // Сохраняем услуги в localStorage при каждом обновлении
    useEffect(() => {
        localStorage.setItem('services', JSON.stringify(services));
    }, [services]);

    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');
    const [newServiceBenefits, setNewServiceBenefits] = useState('');
    const [newServiceContraindications, setNewServiceContraindications] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');
    const [newServicePhoto, setNewServicePhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Для отображения ошибок

    // Функция для конвертации цен в выбранную валюту
    const convertPrice = (price, currency) => {
        const priceValue = parseFloat(price.replace(/[^\d.-]/g, ''));
        if (currency === 'UA') return `UA ${priceValue * 41}`; // пример пересчета в гривны
        if (currency === 'EUR') return `€ ${(priceValue * 0.85).toFixed(2)}`; // пример пересчета в евро
        return `$${priceValue}`; // по умолчанию доллар
    };

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
            price: convertPrice(newServicePrice, selectedCurrency),
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
        setIsModalOpen(false); // Закрываем первое окно
        setIsFourthModalOpen(false); // Закрываем четвёртое окно
    };

    const handleFileChange = (e) => {
        setNewServicePhoto(e.target.files[0]);  // Устанавливаем фото
        setIsFourthModalOpen(true);  // Открываем четвёртое модальное окно
    };

    // Функция для открытия модального окна с информацией о конкретной услуге
    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    // Функция для удаления услуги
    const handleDeleteService = (serviceName) => {
        const updatedServices = services.filter(service => service.name !== serviceName);
        setServices(updatedServices);
        setSelectedService(null); // Закрываем модальное окно после удаления
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
                    <div className="service-item" key={index} onClick={() => handleServiceClick(service)}>
                        <span>{service.name}</span>
                        <span>{service.price}</span>
                    </div>
                ))}
            </div>

            {/* Первое модальное окно */}
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

            {/* Пятое модальное окно с информацией об услуге */}
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
                            {/* Левая сторона: фото */}
                            <div className="modal5-left">
                                {selectedService.photo ? (
                                    <img src={selectedService.photo} alt="Service" />
                                ) : (
                                    <img src={img} alt="No photo available" />
                                )}
                            </div>

                            {/* Правая сторона: описание, цена и т.д. */}
                            <div className="modal5-right">
                                <p><strong>Description:</strong> {selectedService.description}</p>
                                <p><strong>Benefits:</strong> {selectedService.benefits}</p>
                                <p><strong>Contraindications:</strong> {selectedService.contraindications}</p>
                                <p><strong>Price:</strong> {selectedService.price}</p>

                                {/* Кнопка удаления */}
                                <button className="delete-service-btn" onClick={() => handleDeleteService(selectedService.name)}>
                                    Delete Service
                                </button>
                            </div>
                        </div>
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
                            <h3>Add New Service</h3>
                        </div>
            
                        <div className="modal4-body">
                            {/* Left Side: Headline and Image */}
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

                            {/* Right Side: Fields */}
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

                                {/* Error message */}
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                        </div>
            
                        <div className="modal4-footer">
                            <button className="save-btn" onClick={handleAddService}>
                                Add Service
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
