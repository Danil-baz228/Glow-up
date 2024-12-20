import React, {useEffect, useMemo} from 'react';
import "./css/ClientPage/MasterDetailsComponent.css";
import navigationIcon from "./img/ClientPage/icon_navigation.png";
import heartIcon from "./img/ClientPage/icon_heart.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import { useLanguage } from './LanguageContext';

const MasterDetailsComponent = ({ master }) => {
    const { language } = useLanguage();
    const roundedRating = useMemo(() => Math.round(master.avgRating), [master.avgRating]);

    const authUser = useAuthUser();

    const authUserId = authUser ? authUser.id : null;

    const removeFavoriteMaster = async () => {
        axios.delete(`http://localhost:5000/api/clients/${authUserId}/favorite-master`, {
            data: {masterId: master.id}
        })
            .then(() => {
                console.log("Master removed from favorites");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Translations
    const translations = {
        UA: {
            reviews: "{{count}} відгуки",
            noReviews: "Ще немає відгуків",
            open: "Відкрити",
        },
        EN: {
            reviews: "{{count}} reviews",
            noReviews: "No reviews yet",
            open: "Open",
        },
    };

    // Get the appropriate text based on the current language
    const reviewsText = master?.reviewsCount
        ? translations[language].reviews.replace("{{count}}", master.reviewsCount)
        : translations[language].noReviews;

    return (
        <div className={"masterDetailsBox"}>
            <img className={"masterImage"} src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=" alt=""/>
            <div className="favoriteButton">
                <img className={"heartIcon"} src={heartIcon} alt="" onClick={removeFavoriteMaster}/>
            </div>
            <div className="masterInfo">
                <div className="masterTitle">
                    <div className="masterName">{master.first_name + " " + master.last_name}</div>
                    <div className="masterOccupation">{master.Occupation.name}</div>
                </div>
                <div className="masterCategories">
                    {
                        master.categories.slice(0, 4).map((category, index) => (
                            <div key={index} className="masterCategory">{category.name}</div>
                        ))
                    }
                </div>
            </div>
            <div className="masterAdditionalInfo">
                <div className="masterRatingBox">
                    <div className="masterRating">{master.avgRating}</div>
                    <div className="starRatingBox">
                        <div className="starRating">
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
                        <div className="reviewsCount">{reviewsText}</div>
                    </div>
                </div>
                <div className="masterAddress">
                    <img className={"navIcon"} src={navigationIcon} alt=""/>
                    <div className="masterSalon">{master.Salon.City.name + ", " + master.Salon.address}</div>
                </div>
            </div>
            <div className="masterButtonBox">
                <button className={master.gender === "male" ? "masterButtonMale" : "masterButtonFemale"}>
                    {translations[language].open}
                </button>
            </div>
        </div>
    );
};

export default MasterDetailsComponent;