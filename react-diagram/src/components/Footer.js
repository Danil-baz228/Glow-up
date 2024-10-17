import React from 'react';
import logoInstagram from './img/instagram.png';
import logoTelegram from './img/telegram.png';
import './css/Footer.css';

import { useLocation } from 'react-router-dom';


const Footer = () => {
  const location = useLocation(); 

  
  const footerClass = location.pathname === '/' ? 'footer footer-purple' : location.pathname === '/CurrentTopics' ? 'footer footer-black' : 'footer';

  return (
    <footer className={footerClass}>
      <div className="footer-column">
        <ul>
          <li><a href="/catalog">Catalog of services</a></li>
          <li><a href="/specialists">Specialists</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <ul>
          <li><a href="/faq">Questions and answers</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/404">404</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <ul>
          <li><a href="/about">About us</a></li>
          <li><a href="/account">Account</a></li>
          <li><a href="/history">History</a></li>
          <li><a href="/favorites">Favorites</a></li>
        </ul>
      </div>

      <div className="footer-column contact-info">
        <p>E-mail: <a href="mailto:glow_up@gmail.com">glow_up@gmail.com</a></p>
        <p>Phone: 987-654-3210</p>
        <div className="footer-icons">
          <a href="https://www.instagram.com/"><img src={logoInstagram} alt="Instagram" /></a>
          <a href="https://web.telegram.org/"><img src={logoTelegram} alt="Telegram" /></a>
          <a href="tel:987-654-3210"><img src={logoTelegram} alt="Phone" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
