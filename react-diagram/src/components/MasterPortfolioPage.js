import React, { useState } from 'react';
import "./css/MasterPage/MasterPortfolioPage.css";
import NewPortfolioModal from "./NewPortfolioModal";

import facialTreatmentImg from './img/port.png';
import skinRejuvenationImg from './img/port.png';
import eyebrowTintingImg from './img/port.png';
const MasterPortfolioPage = () => {
    const [portfolioItems, setPortfolioItems] = useState([
        { id: 1, name: "Facial Treatment Result", imageUrl: facialTreatmentImg, description: "Before and after anti-aging treatment." },
        { id: 2, name: "Skin Rejuvenation", imageUrl: skinRejuvenationImg, description: "Visible results after skin rejuvenation." },
        { id: 3, name: "Eyebrow Tinting", imageUrl: eyebrowTintingImg, description: "Natural-looking eyebrow tinting results." }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPortfolioItem = (newItem) => {
        setPortfolioItems([...portfolioItems, {
            id: portfolioItems.length + 1,
            name: newItem.name,
            imageUrl: newItem.imageUrl,
            description: newItem.description
        }]);
        setIsModalOpen(false);
    };

    return (
        <div className="masterPortfolioPage">
            <button onClick={() => setIsModalOpen(true)} className="addPortfolioButton">Add new service +</button>

            {isModalOpen && <NewPortfolioModal onClose={() => setIsModalOpen(false)} onAdd={handleAddPortfolioItem} />}

            <div className="portfolioList">
                {portfolioItems.map((item) => (
                    <div className="portfolioCard" key={item.id}>
                        <img src={item.imageUrl} alt={item.name} className="portfolioImage" />
                        <div className="portfolioDetails">
                            <div className="portfolioName">{item.name}</div>
                            <div className="portfolioDescription">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasterPortfolioPage;
