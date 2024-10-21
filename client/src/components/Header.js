import React from 'react';
import './Header.css';  // Подключение стилей
import logo from '../assets/Glow_up.png';  // Правильный путь к изображению

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>
      <nav className="header-menu">
        <a href="#services">Catalog of services</a>
        <a href="#specialists">Specialists</a>
        <a href="#about">About us</a>
      </nav>
      <div className="header-right">
        <span className="header-username">Name Nickname</span>
        <span className="header-likes">
          <i className="fas fa-heart"></i> (0)
        </span>
        <i className="fas fa-search"></i>
        <div className="header-language">
          <span>EN</span> <i className="fas fa-caret-down"></i>
          
        </div>
        <i className="fas fa-external-link-alt"></i>
      </div>
    </header>
  );
};

export default Header;