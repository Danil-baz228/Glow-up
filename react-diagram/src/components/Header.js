import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useLanguage } from './LanguageContext'; 
import logoSmall from './img/logoSmall.png'; 
import './css/Header.css'; 
import { FaSearch, FaUser } from 'react-icons/fa'; 

const Header = ({ isScrolled }) => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage(); 

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
        <Link to="/"><img src={logoSmall} alt="Service 1" /></Link>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li><Link to="/serviceCatalog">{translations[language].catalog}</Link></li>
          <li><Link to="/masters">{translations[language].masters}</Link></li>
          <li><Link to="/CurrentTopics">{translations[language].aboutUs}</Link></li>
        </ul>
      </nav>
      <div className="header-icons">
        <FaSearch className="icon" />
        <div className="language-selector" onClick={toggleLanguage}>
          <span>{language}</span>
        </div>
        <FaUser className="icon" />
      </div>
    </header>
  );
};

export default Header;
