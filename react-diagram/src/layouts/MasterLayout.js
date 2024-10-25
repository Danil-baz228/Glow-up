import React, { useEffect, useState } from 'react';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import { FaPencil } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import './MasterLayout.css';
import defaultProfilePhoto from './img/ProfilPhoto.png'; // Заглушка для аватарки
import background from './img/backForProfile.png';

const MasterLayout = () => {
    const authUser = useAuthUser();
    const authUserId = authUser ? authUser.id : null;

    const [currentUser, setCurrentUser] = useState(null);
    const [currentMaster, setCurrentMaster] = useState(null);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные о пользователе
                const userResponse = await axios.get(`http://localhost:5000/api/users/${authUserId}`);
                setCurrentUser(userResponse.data);
                setFirstName(userResponse.data.first_name);
                setLastName(userResponse.data.last_name);

                // Получаем данные мастера
                const masterResponse = await axios.get(`http://localhost:5000/api/masters/userId/${userResponse.data.user_id}`);
                setCurrentMaster(masterResponse.data);
            } catch (error) {
                console.log('Ошибка при получении данных:', error);
            }
        };

        if (authUserId) {
            fetchData();
        }
    }, [authUserId, isUpdateRequired]);

    return (
        <div className={"masterLayout"}>
            <div className="profile-header">
                <div className="profile-background" style={{ backgroundImage: `url(${background})` }}>
                    <div className="profile-photo-container">
                        <img
                            src={currentMaster && currentMaster.background_url
                                ? `http://localhost:5000/images/${currentMaster.background_url}`
                                : defaultProfilePhoto}
                            alt="Profile"
                            className="profile-photo"
                        />
                    </div>
                </div>
                <div className="profile-info">
                    <h2>
                        {currentMaster ? `${currentMaster.first_name} ${currentMaster.last_name}` : 'Загрузка...'}
                    </h2>
                    <span>master</span>
                    <div className="profile-actions">
                        <button className="chat-button">My chats</button>
                        <button className="appointment-button">Appointments</button>
                        <button className="edit-button">Edit profile</button>
                    </div>
                </div>
            </div>

            <div className="masterHeader">
                <NavLink to={"portfolio"} className={"masterNavigationButton"}>Portfolio</NavLink>
                <NavLink to={"services"} className={"masterNavigationButton"}>Services</NavLink>
                <NavLink to={"reviews"} className={"masterNavigationButton"}>Reviews</NavLink>
                <NavLink to={"about"} className={"masterNavigationButton"}>About</NavLink>
                <NavLink to={"location"} className={"masterNavigationButton"}>Location</NavLink>
            </div>
            <Outlet context={{ currentUser, currentMaster, setIsUpdateRequired }} />
        </div>
    );
};

export default MasterLayout;
