import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./css/MasterPage/MasterServicesPage.css";
import NewServiceModal from "./NewServiceModal";

const MasterServicesPage = () => {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Получение списка услуг при загрузке компонента
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/services');
                setServices(response.data);
            } catch (error) {
                console.log("Ошибка при получении услуг:", error);
            }
        };
        fetchServices();
    }, []);

    // Добавление новой услуги на сервер
    const handleAddService = async (newService) => {
        try {
            const response = await axios.post('http://localhost:5000/api/services', {
                title: newService.headline,
                description: newService.description,
                benefits: newService.benefits,
                contraindications: newService.contraindications,
                price: parseFloat(newService.price),
                duration: 60,
                image_url: "default.jpg",
                category_id: 1,
                master_id: 1
            });

            setServices([...services, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.log("Ошибка при добавлении новой услуги:", error);
        }
    };

    // Удаление услуги с сервера
    const handleDeleteService = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:5000/api/services/${serviceId}`);
            // Удаляем услугу из локального состояния после успешного удаления
            setServices(services.filter(service => service.service_id !== serviceId));
        } catch (error) {
            console.log("Ошибка при удалении услуги:", error);
        }
    };

    return (
        <div className="clientServicesPage">
            <button onClick={() => setIsModalOpen(true)} className="addServiceButton">Add new service +</button>

            {isModalOpen && (
                <NewServiceModal onClose={() => setIsModalOpen(false)} onAdd={handleAddService} />
            )}

            <div className="serviceList">
                {services.map((service) => (
                    <div className="serviceCard" key={service.service_id}>
                        <div className="serviceDetails">
                            <div className="serviceName">{service.title}</div>
                        </div>
                        <div className="servicePrice">${service.price}</div>
                        <button onClick={() => handleDeleteService(service.service_id)} className="deleteServiceButton">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasterServicesPage;
