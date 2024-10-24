import React, { useEffect, useState } from 'react';
import eyeIcon from "./img/AuthController/icon_eye.png";
import './css/ClientPage/ClientDetailsPage.css';
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useLanguage } from './LanguageContext';

const ClientDetailsPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { currentUser, currentClient, setIsUpdateRequired } = useOutletContext();
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);

    const { language } = useLanguage();

    const translations = {
        UA: {
            name: 'Ваше ім\'я та прізвище',
            email: 'Ваш Email',
            newPassword: 'Новий пароль',
            repeatPassword: 'Повторіть новий пароль',
            phone: 'Ваш номер телефону',
            address: 'Ваша адреса',
            cancel: 'Скасувати',
            save: 'Зберегти',
            passwordMismatch: 'Паролі не співпадають',
            changesSaved: 'Зміни збережено',
        },
        EN: {
            name: 'Your First Name and Last Name',
            email: 'Your Email',
            newPassword: 'New password',
            repeatPassword: 'Repeat new password',
            phone: 'Your phone number',
            address: 'Your address',
            cancel: 'Cancel',
            save: 'Save',
            passwordMismatch: 'Passwords do not match',
            changesSaved: 'Changes saved',
        }
    };

    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
        clientPassword: '',
        clientPasswordRepeat: ''
    });

    useEffect(() => {
        if (isPasswordChanged) {
            axios.put(`http://localhost:5000/api/users/${currentUser.user_id}`, {
                password: formData.clientPassword
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setIsPasswordChanged(false);
        setFormData({
            clientName: '',
            clientEmail: '',
            clientPhone: '',
            clientAddress: '',
            clientPassword: '',
            clientPasswordRepeat: ''
        });
    }, [isPasswordChanged]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkPasswords()) {
            return;
        }

        axios.put(`http://localhost:5000/api/clients/${currentClient.client_id}`, {
            last_name: formData.clientName.split(' ')[0] || currentClient.last_name,
            first_name: formData.clientName.split(' ')[1] || currentClient.first_name,
            email: formData.clientEmail || currentClient.email,
            phone: formData.clientPhone || currentClient.phone,
            address: formData.clientAddress || currentClient.address
        })
            .then((response) => {
                console.log(response);
                setIsUpdateRequired(true);
                setIsModalSuccessVisible(true);
                setTimeout(() => setIsModalSuccessVisible(false), 2900);
            })
            .catch((error) => {
                console.log(error);
            });
        if (formData.clientPassword.trim() === '') {
            handleReset(e);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            clientName: '',
            clientEmail: '',
            clientPhone: '',
            clientAddress: '',
            clientPassword: '',
            clientPasswordRepeat: ''
        });
    };

    const checkPasswords = () => {
        const { clientPassword, clientPasswordRepeat } = formData;

        if (clientPassword.trim() !== '') {
            if (clientPassword !== clientPasswordRepeat) {
                alert(translations[language].passwordMismatch);
                return false;
            }
            setIsPasswordChanged(true);
        }
        return true;
    };

    return (
        <div className="clientDetailsPage">
            <form onSubmit={handleSubmit}>
                <div className="clientFormLabel">{translations[language].name}</div>
                <input name="clientName" type="text"
                       value={formData.clientName}
                       placeholder={currentClient ? `${currentClient.last_name} ${currentClient.first_name}` : ""}
                       onChange={handleInputChange}
                />
                <div className="clientFormLabel">{translations[language].email}</div>
                <input name="clientEmail" type="email"
                       value={formData.clientEmail}
                       placeholder={currentClient ? currentClient.email : ""}
                       onChange={handleInputChange}
                />
                <div className="clientFormLabel">{translations[language].newPassword}</div>
                <div className="password-input-wrapper">
                    <input name="clientPassword" type={isPasswordVisible ? "text" : "password"}
                           value={formData.clientPassword}
                           onChange={handleInputChange}
                    />
                    <img src={eyeIcon} alt="Show Password" onClick={togglePasswordVisibility} className="eye-icon" />
                </div>
                <div className="clientFormLabel">{translations[language].repeatPassword}</div>
                <div className="password-input-wrapper">
                    <input name="clientPasswordRepeat" type={isPasswordVisible ? "text" : "password"}
                           value={formData.clientPasswordRepeat}
                           onChange={handleInputChange}
                    />
                    <img src={eyeIcon} alt="Show Password" onClick={togglePasswordVisibility} className="eye-icon" />
                </div>
                <div className="clientFormLabel">{translations[language].phone}</div>
                <input name="clientPhone" type="tel"
                       value={formData.clientPhone}
                       placeholder={currentClient ? currentClient.phone : ""}
                       onChange={handleInputChange}
                />
                <div className="clientFormLabel">{translations[language].address}</div>
                <input name="clientAddress" type="text"
                       value={formData.clientAddress}
                       placeholder={currentClient ? currentClient.address : ""}
                       onChange={handleInputChange}
                />
                <div className="clientDetailsFormButtons">
                    <button type="reset" onClick={handleReset}>{translations[language].cancel}</button>
                    <button type="submit">{translations[language].save}</button>
                </div>
            </form>
            {isModalSuccessVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>{translations[language].changesSaved}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDetailsPage;
