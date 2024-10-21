import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import logo from './img/Logo.png';
import logoSmall from './img/logoSmall.png';
import './css/Header.css';
import { FaSearch, FaUser, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Header = ({toggleAuthModal, isScrolled}) => {
    const { language, toggleLanguage } = useLanguage();

    const authUser = useAuthUser();
    const signOut = useSignOut();

    const userName = authUser ? authUser.username : null;

    const handleSignOut = () => {
        signOut();
        window.location.reload();
    };

    const translations = {
        UA: {
            catalog: 'Каталог послуг',
            masters: 'Майстри',
            aboutUs: 'Про нас',
        },
        EN: {
            catalog: 'Service Catalog',
            masters: 'Masters',
            aboutUs: 'About Us',
        },
    };


    return (
        <header className={`header ${isScrolled ? 'fixed' : ''}`}>
            <div className="header-logo">
                <Link to="/"><img src={logoSmall} alt="Service 1"/></Link>
            </div>
            <nav className="header-nav">
                <ul className="nav-list">
                    <li><Link to="/serviceCatalog">{translations[language].catalog}</Link></li>
                    <li><Link to="/masters">{translations[language].masters}</Link></li>
                    <li><Link to="/CurrentTopics">{translations[language].aboutUs}</Link></li>
                </ul>
            </nav>
            <div className="header-icons">
                <Link to="/masters"><FaSearch className="icon"/></Link>
                <div className="language-selector"  onClick={toggleLanguage}>
                    <span>{language}</span>
                </div>
                {authUser === null ?
                    <>
                        <FaSignInAlt className="icon signInIcon" onClick={toggleAuthModal}/>
                    </>
                    :
                    <>
                        <Link className="userInfo" to="/account/details">
                            <div className="userInfo">
                                <span className={'usernameTextBox'}>{userName}</span>
                                <FaUser className="icon"/>
                            </div>
                        </Link>
                        <FaSignOutAlt className="icon signOutIcon" onClick={handleSignOut}/>
                    </>
                }
            </div>
        </header>
    );
};

export default Header;
