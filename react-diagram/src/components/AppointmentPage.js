import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/AppointmentPage/AppointmentPage.css';

const AppointmentPage = () => {
    const location = useLocation();
    const service = location.state;

    console.log('Полученные данные о сервисе:', service);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        date: '',
        time: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dateTimeStart = new Date(`${formData.date}T${formData.time}`);
        const dateTimeEnd = new Date(dateTimeStart);
        dateTimeEnd.setHours(dateTimeEnd.getHours() + 1);

        const appointmentData = {
            date_start: dateTimeStart,
            date_end: dateTimeEnd,
            status: 'pending',
            client_id: 1,
            service_id: service?.id
        };

        try {
            const response = await axios.post('/api/appointments', appointmentData);
            console.log('Appointment created:', response.data);
            alert('Appointment successfully created!');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment');
        }
    };

    return (
        <div className="appointment-page-container">
            <div className="appointment-page-form-section">
                <h2>Make an appointment for {service?.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="appointment-page-form-group">
                        <label>First name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="appointment-page-form-group">
                        <label>Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="appointment-page-form-group">
                        <label>Phone number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="appointment-page-form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="appointment-page-form-group">
                        <label>Choose date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="appointment-page-form-group">
                        <label>Choose time</label>
                        <select
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select time</option>
                            <option value="10:30">10:30</option>
                            <option value="12:00">12:00</option>
                            <option value="14:30">14:30</option>
                            <option value="17:00">17:00</option>
                            <option value="19:30">19:30</option>
                        </select>
                    </div>
                    <button type="submit" className="appointment-page-btn appointment-page-btn-primary">Make an appointment</button>
                    <button type="button" className="appointment-page-btn appointment-page-btn-secondary">Cancel</button>
                </form>
            </div>
            <div className="appointment-page-image-section">
                {service?.image && (
                    <img src={`/images/${service.image}`} alt={service.name} />
                )}
            </div>
        </div>
    );
};

export default AppointmentPage;