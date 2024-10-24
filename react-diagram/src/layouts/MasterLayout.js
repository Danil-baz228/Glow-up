import React, {useEffect, useState} from 'react';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import {FaPencil} from "react-icons/fa6";
import {NavLink, Outlet} from "react-router-dom";
import './MasterLayout.css';

const MasterLayout = () => {
    const authUser = useAuthUser();
    const authUserId = authUser ? authUser.id : null;

    const [currentUser, setCurrentUser] = useState(null);
    const [currentMaster, setCurrentMaster] = useState(null);

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

        axios.get(`http://localhost:5000/api/masters/userId/${authUserId}`)
            .then((response) => {
                setCurrentMaster(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsUpdateRequired(false);
    }, [authUserId, isUpdateRequired]);

    return (
        <div className={"masterLayout"}>
            <div className="masterTitle">
                {
                    authUser && currentMaster ?
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
                                style={{display: 'none'}}
                                accept="image/*"
                            />
                            <h2 className={"clientName"}>{currentMaster.last_name} {currentMaster.first_name}</h2>
                        </>
                        : null
                }
            </div>
            <div className="masterHeader">
                <NavLink to={"portfolio"} className={"masterNavigationButton"}>Portfolio</NavLink>
                <NavLink to={"services"} className={"masterNavigationButton"}>Services</NavLink>
                <NavLink to={"reviews"} className={"masterNavigationButton"}>Reviews</NavLink>
                <NavLink to={"about"} className={"masterNavigationButton"}>About</NavLink>
                <NavLink to={"location"} className={"masterNavigationButton"}>Location</NavLink>
            </div>
            <Outlet context={{currentUser, currentMaster, setIsUpdateRequired}}/>
        </div>
    );
};

export default MasterLayout;