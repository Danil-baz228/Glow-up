import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import logo from './img/Logo.png'; 
import logoSmall from './img/logoSmall.png'; 
import './css/Header.css'; 
import { FaSearch, FaUser } from 'react-icons/fa'; 

const Header = ({toggleAuthModal}) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-logo">
        
      <Link to="/"><img src={logoSmall} alt="Service 1" /></Link>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li><Link to="/serviceCatalog">Каталог послуг</Link></li>
          <li><Link to="/masters">Майстри</Link></li>
          <li><Link to="/CurrentTopics">Про нас</Link></li>
        </ul>
      </nav>
      <div className="header-icons">
        <FaSearch className="icon" />
        <div className="language-selector">
          <span>UA</span>
          <FaUser className="icon" onClick={toggleAuthModal}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
