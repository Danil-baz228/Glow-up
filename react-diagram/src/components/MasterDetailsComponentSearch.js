import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; // Import useLanguage hook
import "./css/SpecialistsSearchPage/MasterDetailsComponentSearch.css";
import heartIcon from "./img/ClientPage/icon_heart.png";

const MasterDetailsComponentSearch = ({ master, clientId }) => {
    const navigate = useNavigate();
    const [hasErrorLoadingImage, setHasErrorLoadingImage] = useState(false);
    const { language } = useLanguage(); // Get current language

    // Log master data for debugging
    console.log(master);

    const roundedRating = useMemo(() => Math.round(master.avgRating), [master.avgRating]);

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getImagePath = (avatarUrl, masterId) => {
        return avatarUrl ? `/images/masters/${masterId}/${avatarUrl}` : '';
    };

    const hasAvatar = master.avatar_url && master.avatar_url.trim() !== "";

    const handleOpenClick = () => {
        if (clientId) {
            localStorage.setItem('clientId', clientId);
            navigate(`/masters/${master.master_id}/services`);
        } else {
            console.error("Client ID is not available.");
        }
    };

    // Translations object
    const translations = {
        UA: {
            openButton: "Відкрити",
            reviewsCount: (count) => count > 0 ? `${count} відгуків` : "0 відгуків",
        },
        EN: {
            openButton: "Open",
            reviewsCount: (count) => count > 0 ? `${count} reviews` : "0 reviews",
        }
    };

    return (
        <div className="specialists-search-master-details-search-masterDetailsBox">
            <div className="specialists-search-master-details-search-masterImageContainer">
                {hasAvatar && !hasErrorLoadingImage ? (
                    <img
                        className="specialists-search-master-details-search-masterImage"
                        src={getImagePath(master.avatar_url, master.master_id)}
                        alt={`${master.first_name} ${master.last_name}`}
                        onError={() => setHasErrorLoadingImage(true)}
                    />
                ) : (
                    <div className="specialists-search-master-details-search-masterInitials">
                        {getInitials(master.first_name, master.last_name)}
                    </div>
                )}
            </div>
            <div className="specialists-search-master-details-search-favoriteButton">
                <img className="specialists-search-master-details-search-heartIcon" src={heartIcon} alt="" />
            </div>
            <div className="specialists-search-master-details-search-masterInfo">
                <div className="specialists-search-master-details-search-masterTitle">
                    <div className="specialists-search-master-details-search-masterName">{master.first_name + " " + master.last_name}</div>
                    <div className="specialists-search-master-details-search-masterOccupation">{master.Occupation.name}</div>
                </div>
            </div>
            <div className="specialists-search-master-details-search-masterAdditionalInfo">
                <div className="specialists-search-master-details-search-masterRatingBox">
                    <div className="specialists-search-master-details-search-masterRating">{master.avgRating}</div>
                    <div className="specialists-search-master-details-search-starRatingBox">
                        <div className="specialists-search-master-details-search-starRating">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill={index < roundedRating ? `#CCEA2E` : "none"}
                                    stroke="#CCEA2E"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 .587l3.668 7.568L24 9.748l-6 5.857L19.336 24 12 19.847 4.664 24 6 15.605 0 9.748l8.332-1.593L12 .587z" />
                                </svg>
                            ))}
                        </div>
                        <div className="specialists-search-master-details-search-reviewsCount">
                            {translations[language].reviewsCount(master.reviewsCount)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="specialists-search-master-details-search-masterButtonBox">
                <button
                    className={master.gender === "male" ? "specialists-search-master-details-search-masterButtonMale" : "specialists-search-master-details-search-masterButtonFemale"}
                    onClick={handleOpenClick}
                >
                    {translations[language].openButton} {/* Use the translation */}
                </button>
            </div>
        </div>
    );
};

export default MasterDetailsComponentSearch;
