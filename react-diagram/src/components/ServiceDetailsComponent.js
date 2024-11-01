import React from 'react';

const ServiceDetailsComponent = ({ service, onSelect }) => {
  return (
    <div className="service-card" onClick={onSelect}>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <p>Цена: {service.price} грн</p>
      <p>Продолжительность: {service.duration} мин</p>
      <img src={service.image_url} alt={service.title} className="service-image" />
    </div>
  );
};

export default ServiceDetailsComponent;
