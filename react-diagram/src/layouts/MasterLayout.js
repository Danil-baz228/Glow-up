import React, { useEffect, useState, useRef } from 'react';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
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
    const fileInputRef = useRef(null); // Ссылка на input для загрузки файла

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:5000/api/users/${authUserId}`);
                setCurrentUser(userResponse.data);

                const masterResponse = await axios.get(`http://localhost:5000/api/masters/userId/${userResponse.data.user_id}`);
                setCurrentMaster(masterResponse.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        if (authUserId) {
            fetchData();
        }
    }, [authUserId, isUpdateRequired]);

    const handleImageClick = () => {
        fileInputRef.current.click(); // Открываем выбор файла по клику на изображение
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            console.warn('Файл не выбран');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            console.log(`Отправка запроса на: http://localhost:5000/api/users/${authUserId}/upload-avatar`); // Для отладки
            const response = await axios.post(`http://localhost:5000/api/users/${authUserId}/upload-avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                setIsUpdateRequired(prev => !prev); // Обновляем состояние после загрузки аватара
                console.log('Аватар успешно загружен:', response.data);
            } else {
                console.error('Неожиданный статус ответа:', response.status);
            }
        } catch (error) {
            if (error.response) {
                console.error('Ошибка при загрузке аватара:', error.response.data);
                console.error('Статус ошибки:', error.response.status);
            } else if (error.request) {
                console.error('Запрос был выполнен, но ответ не был получен:', error.request);
            } else {
                console.error('Ошибка при настройке запроса:', error.message);
            }
        }
    };



    return (
        <div className="masterLayout">
            <div className="profile-header">
                <div className="profile-background" style={{ backgroundImage: `url(${background})` }}>
                    <div className="profile-photo-container" onClick={handleImageClick}>
                        <img
                            src={currentUser && currentUser.avatar_url
                                ? `http://localhost:5000${currentUser.avatar_url}` // Убедитесь, что путь правильный
                                : defaultProfilePhoto}
                            alt="Profile"
                            className="profile-photo"
                        />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
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
                <NavLink to="portfolio" className="masterNavigationButton">Portfolio</NavLink>
                <NavLink to="services" className="masterNavigationButton">Services</NavLink>
                <NavLink to="reviews" className="masterNavigationButton">Reviews</NavLink>
                <NavLink to="about" className="masterNavigationButton">About</NavLink>
                <NavLink to="location" className="masterNavigationButton">Location</NavLink>
            </div>
            <Outlet context={{ currentUser, currentMaster, setIsUpdateRequired }} />
        </div>
    );
};

export default MasterLayout;
