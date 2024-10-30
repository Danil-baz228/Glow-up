import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/ClientPage/MasterDetailsComponentSearch.css";
import navigationIcon from "./img/ClientPage/icon_navigation.png";
import heartIcon from "./img/ClientPage/icon_heart.png";

const defaultAvatarUrl = "https://example.com/default-avatar.png";

const MasterDetailsComponentSearch = ({ master }) => {
    const navigate = useNavigate();

    const roundedRating = useMemo(() => Math.round(master.avgRating), [master.avgRating]);

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getImagePath = (avatarUrl, masterId) => {
        return avatarUrl ? `/images/masters/${masterId}/${avatarUrl}` : '';
    };

    const hasAvatar = master.avatar_url && master.avatar_url.trim() !== "";

    const handleOpenClick = () => {
        navigate('/appointment');
    };

    return (
        <div className={"specialists-search-masterDetailsBox"}>
            <div className="specialists-search-masterImageContainer">
                {hasAvatar ? (
                    <img
                        className={"specialists-search-masterImage"}
                        src={getImagePath(master.avatar_url, master.master_id)}
                        alt={`${master.first_name} ${master.last_name}`}
                        onError={(e) => {
                            console.error(`Failed to load image: ${e.target.src}`);
                            e.target.onerror = null;
                            e.target.src = defaultAvatarUrl;
                        }}
                    />
                ) : (
                    <div className="specialists-search-masterInitials">
                        {getInitials(master.first_name, master.last_name)}
                    </div>
                )}
            </div>
            <div className="specialists-search-favoriteButton">
                <img className={"specialists-search-heartIcon"} src={heartIcon} alt=""/>
            </div>
            <div className="specialists-search-masterInfo">
                <div className="specialists-search-masterTitle">
                    <div className="specialists-search-masterName">{master.first_name + " " + master.last_name}</div>
                    <div className="specialists-search-masterOccupation">{master.Occupation.name}</div>
                </div>
            </div>
            <div className="specialists-search-masterAdditionalInfo">
                <div className="specialists-search-masterRatingBox">
                    <div className="specialists-search-masterRating">{master.avgRating}</div>
                    <div className="specialists-search-starRatingBox">
                        <div className="specialists-search-starRating">
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
                                        d="M12 .587l3.668 7.568L24 9.748l-6 5.857L19.336 24 12 19.847 4.664 24 6 15.605 0 9.748l8.332-1.593L12 .587z"/>
                                </svg>
                            ))}
                        </div>
                        <div className="specialists-search-reviewsCount">
                            {master.reviewsCount > 0 ? `${master.reviewsCount} reviews` : "0 reviews"}
                            </div>
                    </div>
                </div>
            </div>
            <div className="specialists-search-masterButtonBox">
                <button
                  className={master.gender === "male" ? "specialists-search-masterButtonMale" : "specialists-search-masterButtonFemale"}
                  onClick={handleOpenClick}
                >
                    Open
                </button>
            </div>
        </div>
    );
};

export default MasterDetailsComponentSearch;
