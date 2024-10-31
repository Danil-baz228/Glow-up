import React, {useEffect, useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import './ClientLayout.css';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import {FaPencil} from "react-icons/fa6";

const ClientLayout = ({toggleAuthModal}) => {
    const authUser = useAuthUser();
    const authUserId = authUser ? authUser.id : null;
    const userName = authUser ? authUser.name : null;

    const [currentUser, setCurrentUser] = useState(null);
    const [currentClient, setCurrentClient] = useState(null);

    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${authUserId}`)
            .then((response) => {
                setCurrentUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`http://localhost:5000/api/clients/userId/${authUserId}`)
            .then((response) => {
                setCurrentClient(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsUpdateRequired(false);
    }, [authUserId, isUpdateRequired]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
            uploadAvatar(file);
        }
    };

    const uploadAvatar = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await axios.post(
                `http://localhost:5000/api/users/upload-avatar/${authUserId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setIsUpdateRequired(true);
            window.location.reload();
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    return (
        <div className={"clientLayout"}>
            <div className="clientTitle">
                {
                    authUser && currentClient ?
                        <>
                            <img
                                src={currentUser ? `http://localhost:5000${currentUser.avatar_url}` : '/default-avatar.png'}
                                alt="Avatar"
                                className="clientAvatar"
                            />
                            <FaPencil className="editAvatarIcon"
                                        onClick={() => document.getElementById('avatarInput').click()}
                            />
                            <input
                                type="file"
                                id="avatarInput"
                                onChange={handleFileChange}
                                style={{display: 'none'}}
                                accept="image/*"
                            />
                            <h2 className={"clientName"}>{currentClient.last_name} {currentClient.first_name}</h2>
                        </>
                        : null
                }
            </div>
            <div className="clientHeader">
                <NavLink to={"details"} className={"clientNavigationButton"}>My details</NavLink>
                <NavLink to={"favorites"} className={"clientNavigationButton"}>Favorites</NavLink>
                <NavLink to={"history"} className={"clientNavigationButton"}>History</NavLink>
                <NavLink to={"discounts"} className={"clientNavigationButton"}>Discounts</NavLink>
            </div>
            {authUser ? <Outlet context={{ currentUser, currentClient, setIsUpdateRequired }} /> :
                <>
                    <div className={"notAuthorizedMessage"}>Not authorized</div>
                    <button className={"clientLayoutLoginButton"} onClick={toggleAuthModal}>Log in</button>
                </>
            }
        </div>
    );
};

export default ClientLayout;