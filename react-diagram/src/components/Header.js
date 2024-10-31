import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import logo from './img/Logo.png';
import logoSmall from './img/logoSmall.png';
import vidlogo from './startAnimation/vidlog.gif';
import vidlogoWhite from './startAnimation/white.gif';
import './css/Header.css';
import { FaSearch, FaUser, FaSignInAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Header = ({ toggleAuthModal, isScrolled }) => {
    const { language, toggleLanguage } = useLanguage();
    const [isMenuOpen, setMenuOpen] = useState(false); // Состояние для управления выпадающим меню

    const authUser = useAuthUser();
    const signOut = useSignOut();
    const location = useLocation();
    const userName = authUser ? authUser.username : null;
    const userRole = authUser ? authUser.role : null;

    console.log(authUser, userName, userRole);

    const handleSignOut = () => {
        signOut();
        window.location.reload();
    };
    let headerClass = 'header';

    if (location.pathname === '/blog') {
        headerClass = 'header fixed';
    }
    const translations = {
        UA: {
            catalog: 'Каталог послуг',
            masters: 'Спеціалісти',
            aboutUs: 'Про нас',
        },
        EN: {
            catalog: 'Service Catalog',
            masters: 'Specialists',
            aboutUs: 'About Us',
        },
    };

    return (
        <header className={`${headerClass} ${isScrolled ? 'fixed' : ''}`}>
            <div className="header-logo">
                <Link to="/"><img
                    src={(isScrolled || location.pathname === '/blog') ? vidlogoWhite : vidlogo}
                    alt="Service 1 Logo"
                /></Link>
            </div>

            {/* Кнопка гамбургера */}
            <FaBars className="hamburger-icon" onClick={() => setMenuOpen(!isMenuOpen)} />

            <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    <li><Link to="/serviceCatalog">{translations[language].catalog}</Link></li>
                    <li><Link to="/masters">{translations[language].masters}</Link></li>
                    <li><Link to="/CurrentTopics">{translations[language].aboutUs}</Link></li>
                </ul>
            </nav>

            <div className="header-icons">
                <Link to="/masters"><FaSearch className="icon" /></Link>
                <div className="language-selector" onClick={toggleLanguage}>
                    <span>{language}</span>
                </div>
                {authUser === null ? (
                    <>
                        <FaSignInAlt className="icon signInIcon" onClick={toggleAuthModal} />
                    </>
                ) : (
                    <>
                        <Link className="userInfo" to={userRole === 'client' ? '/account/details' : '/master/portfolio'}>
                            <div className="userInfo">
                                <span className={'usernameTextBox'}>{userName}</span>
                                <FaUser className="icon" />
                            </div>
                        </Link>
                        <FaSignOutAlt className="icon signOutIcon" onClick={handleSignOut} />
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
