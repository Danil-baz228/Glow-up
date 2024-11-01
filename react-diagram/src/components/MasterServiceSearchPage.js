import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import './css/MasterServiceSearchPage/MasterServiceSearchPage.css';

const MasterServicesPage = () => {
    const { masterId } = useParams();
    const { language } = useLanguage();
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingModalVisible, setBookingModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);

    const translations = {
        UA: {
            title: 'Сервіси спеціаліста',
            chooseDateTime: 'Виберіть дату та час',
            date: 'Дата:',
            time: 'Час:',
            submit: 'Записатися',
            success: 'Успішно!',
            successMessage: 'Запис успішно створено!',
            close: 'Закрити',
            appointment: 'Записатися на прийом',
            advantages: 'Переваги:',
            contraindications: 'Протипоказання:',
            bookingSuccess: 'Запис успішно створено!',
            chooseTime: 'Виберіть час',
        },
        EN: {
            title: 'Master Services',
            chooseDateTime: 'Choose date and time',
            date: 'Date:',
            time: 'Time:',
            submit: 'Submit',
            success: 'Success!',
            successMessage: 'Appointment successfully created!',
            close: 'Close',
            appointment: 'Make an appointment',
            advantages: 'Advantages:',
            contraindications: 'Contraindications:',
            bookingSuccess: 'Appointment successfully created!',
            chooseTime: 'Choose time',
        },
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`/api/services/master/${masterId}`);
                if (!response.ok) throw new Error('Failed to fetch services');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchBookedSlots = async () => {
            try {
                const response = await fetch(`/api/bookings/master/${masterId}`);
                if (!response.ok) throw new Error('Failed to fetch booked slots');
                const data = await response.json();
                setBookedSlots(data.map(booking => booking.date_start));
            } catch (error) {
                console.error('Error fetching booked slots:', error);
            }
        };

        fetchServices();
        fetchBookedSlots();
    }, [masterId]);

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    const openBookingModal = () => {
        setBookingModalVisible(true);
    };

    const closeBookingModal = () => {
        setBookingModalVisible(false);
        setSelectedDate('');
        setSelectedTime('');
    };

    const handleBookingSubmit = async () => {
        if (!selectedDate || !selectedTime) return;

        const appointmentData = {
            date_start: new Date(`${selectedDate}T${selectedTime}`),
            date_end: new Date(`${selectedDate}T${selectedTime}`),
            status: 'Scheduled',
            client_id: 1,
            service_id: selectedService.service_id,
        };

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) throw new Error('Failed to create appointment');
            closeBookingModal();
            setSuccessModalVisible(true);
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Error creating appointment');
        }
    };

    const closeSuccessModal = () => {
        setSuccessModalVisible(false);
    };

    const isDateBooked = (date) => {
        return bookedSlots.some(slot => {
            const bookedDate = new Date(slot);
            return (
                bookedDate.getFullYear() === date.getFullYear() &&
                bookedDate.getMonth() === date.getMonth() &&
                bookedDate.getDate() === date.getDate()
            );
        });
    };

    const availableTimes = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

    return (
        <div className="service-search-container">
            <h1 className="service-search-title">{translations[language].title}</h1>
            <div className="service-search-grid">
                {services.map((service) => (
                    <div key={service.service_id} className="service-search-card" onClick={() => handleServiceClick(service)}>
                        <img src={service.image_url} alt={''} className="service-search-card-image" />
                        <div className="service-search-card-info">
                            <div className="service-search-name">{service.title}</div>
                            <div className="service-search-price">${parseFloat(service.price).toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedService && (
                <div className="service-search-modal">
                    <div className="service-search-modal-content">
                        <button className="service-search-modal-close" onClick={() => setSelectedService(null)}>×</button>
                        <img src={selectedService.image_url} alt={''} className="service-search-modal-image" />
                        <h2 className="service-search-modal-title">{selectedService.title}</h2>
                        <p className="service-search-modal-description">{selectedService.description}</p>
                        <p className="service-search-modal-benefits"><strong>{translations[language].advantages}</strong> {selectedService.benefits}</p>
                        <p className="service-search-modal-contraindications"><strong>{translations[language].contraindications}</strong> {selectedService.contraindications}</p>
                        <div className="service-search-modal-price">${parseFloat(selectedService.price).toFixed(2)}</div>
                        <button className="service-search-modal-appointment" onClick={openBookingModal}>
                            {translations[language].appointment}
                        </button>
                    </div>
                </div>
            )}

            {bookingModalVisible && (
                <div className="booking-modal">
                    <div className="booking-modal-content">
                        <button className="booking-modal-close" onClick={closeBookingModal}>×</button>
                        <h2>{translations[language].chooseDateTime}</h2>
                        <label>{translations[language].date}</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="booking-date-input"
                        />
                        <label>{translations[language].time}</label>
                        <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="booking-time-select"
                        >
                            <option value="">{translations[language].chooseTime}</option>
                            {availableTimes.map(time => {
                                const isBooked = isDateBooked(new Date(`${selectedDate}T${time}`));
                                return (
                                    <option key={time} value={time} disabled={isBooked}>
                                        {time} {isBooked ? "(Занято)" : ""}
                                    </option>
                                );
                            })}
                        </select>
                        <button className="booking-submit-button" onClick={handleBookingSubmit}>
                            {translations[language].submit}
                        </button>
                    </div>
                </div>
            )}

            {successModalVisible && (
                <div className="success-modal">
                    <div className="success-modal-content">
                        <button className="success-modal-close" onClick={closeSuccessModal}>×</button>
                        <h2 className="success-modal-title">{translations[language].success}</h2>
                        <p className="success-modal-message">{translations[language].successMessage}</p>
                        <button className="success-modal-button" onClick={closeSuccessModal}>{translations[language].close}</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .success-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .success-modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    position: relative;
                }

                .success-modal-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .success-modal-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .success-modal-message {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 20px;
                }

                .success-modal-button {
                    width: 100%;
                    padding: 12px;
                    background-color: #333;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .success-modal-button:hover {
                    background-color: #555;
                }
            `}</style>
        </div>
    );
};

export default MasterServicesPage;
