import React, { useState } from 'react';
import './css/AppointmentPage/AppointmentPage.css';

const AppointmentPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="appointment-container">
      <div className="form-section">
        <h2>Make an appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Choose date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
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
          <button type="submit" className="btn btn-primary">Make an appointment</button>
          <button type="button" className="btn btn-secondary">Cancel</button>
        </form>
      </div>
      <div className="image-section">
        <img src="/path-to-your-image.jpg" alt="Procedure" />
      </div>
    </div>
  );
};

export default AppointmentPage;