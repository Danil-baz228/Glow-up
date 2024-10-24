import React, { useState } from 'react';
import "./css/MasterPage/MasterServicesPage.css";
import ServiceDetailsComponent from "./ServiceDetailsComponent";
import NewServiceModal from "./NewServiceModal";


const MasterServicesPage = () => {
    const [services, setServices] = useState([
        { id: 1, name: "Facial Treatments (Anti-aging, Hydrating, De...", price: 70 },
        { id: 2, name: "Microdermabrasion", price: 85 },
        { id: 3, name: "Skin Rejuvenation Treatments", price: 90 },
        { id: 4, name: "Anti-Cellulite Treatments", price: 120 },
        { id: 5, name: "Eyebrow and Eyelash Tinting", price: 95 },
        { id: 6, name: "Chemical Peels (Glycolic, Salicylic, TCA)", price: 105 },
        { id: 7, name: "Microneedling", price: 75 },
        { id: 8, name: "Botox and Fillers", price: 80 }
    ]);
    // для БД
    /*
    useEffect(() => {
        if (currentClient) {
            axios.get(`http://localhost:5000/api/clients/${currentClient.client_id}/services`)
                .then((response) => {
                    setServices(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [currentClient]);
    */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddService = (newService) => {
        setServices([...services, { id: services.length + 1, name: newService.headline, price: newService.price }]);
        setIsModalOpen(false);
    };

    return (
        <div className="clientServicesPage">
            <button onClick={() => setIsModalOpen(true)} className="addServiceButton">Add new service +</button>

            {isModalOpen && <NewServiceModal onClose={() => setIsModalOpen(false)} onAdd={handleAddService} />}

            <div className="serviceList">
                {services.map((service) => (
                    <div className="serviceCard" key={service.id}>
                        <div className="serviceDetails">
                            <div className="serviceName">{service.name}</div>
                        </div>
                        <div className="servicePrice">${service.price}</div>
                        <div className="addServiceIcon">+</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasterServicesPage;
