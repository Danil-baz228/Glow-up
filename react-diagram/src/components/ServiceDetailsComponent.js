import React from 'react';
import "./css/MasterPage/ServiceDetailsComponent.css";

const ServiceDetailsComponent = ({ service }) => {
    return (
        <div className="serviceCard">
            <div className="serviceInfo">
                <div className="serviceName">{service.name}</div>
                <div className="servicePrice">${service.price}</div>
            </div>
            <button className="addButton">+</button>
        </div>
    );
};

export default ServiceDetailsComponent;
