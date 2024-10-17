import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import './ClientLayout.css';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ClientLayout = () => {

    const authUser = useAuthUser();

    const userName = authUser ? authUser.name : "User";

    return (
        <div className={"clientLayout"}>
            <div className="clientTitle">
                <img src="" alt=""/>
                <h2 className={"clientName"}>Пример имени</h2>
            </div>
            <div className="clientHeader">
                <NavLink to={"details"} className={"clientNavigationButton"}>My details</NavLink>
                <NavLink to={"favorites"} className={"clientNavigationButton"}>Favorites</NavLink>
                <NavLink to={"history"} className={"clientNavigationButton"}>History</NavLink>
                <NavLink to={"discounts"} className={"clientNavigationButton"}>Discounts</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export default ClientLayout;