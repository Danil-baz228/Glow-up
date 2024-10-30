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
                duration: 60, // укажите продолжительность по умолчанию или добавьте ее в форму
                image_url: "default.jpg", // замените на путь по умолчанию или добавьте это поле в форму
                category_id: 1, // замените на актуальный category_id или добавьте это поле в форму
                master_id: 1 // замените на актуальный master_id
            });

            setServices([...services, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.log("Ошибка при добавлении новой услуги:", error);
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasterServicesPage;
