import React from 'react';
import imgMasterCard from './img/mastercard.png'; 
import imgVisa from './img/visa.png'; 
import logo from './img/Logo.png'; 
import logoInstagram from './img/instagram.png'; 
import logoFacebook from './img/facebook.png'; 
import logoTelegram from './img/telegram.png'; 
import './css/Footer.css';  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Beauty Unite Logo" className="footer-logo-img" />
        <h2 className="footer-logo-text">Glow up</h2>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Сторінки</h3>
        <ul>
          <li><a href="/allMasters">Усі майстри</a></li>
          <li><a href="/popularTopics">Популярні теми</a></li>
          <li><a href="/blog">Блог</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Юридична інформація</h3>
        <ul>
          <li><a href="/privacyPolicy">Політика конфіденційності</a></li>
          <li><a href="/termsOfUse">Правила користування сайтом</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Зв'язатися з нами</h3>
        <ul>
          <li><a href="mailto:hello@beautyunite.me">hello@beautyunite.me</a></li>
          <li className="footer-icons">
            <a href="https://www.instagram.com/"><img src={logoInstagram} alt="Instagram" /></a>
            <a href="https://www.facebook.com/"><img src={logoFacebook} alt="Facebook" /></a>
            <a href="https://web.telegram.org/a/"><img src={logoTelegram} alt="Telegram" /></a>
          </li>
          <li className="footer-payment">
            <img src={imgMasterCard} alt="Mastercard" />
            <img src={imgVisa} alt="Visa" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
