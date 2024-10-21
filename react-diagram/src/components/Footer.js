import React from 'react';
import { FaInstagram, FaTelegramPlane, FaPhoneAlt } from 'react-icons/fa';
import './css/Footer.css';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const Footer = () => {
  const location = useLocation();
  const { language } = useLanguage();

  const footerClass = location.pathname === '/'
      ? 'footer footer-purple'
      : 'footer footer-black';

  const translations = {
    UA: {
      catalog: 'Каталог послуг',
      specialists: 'Спеціалісти',
      blog: 'Блог',
      questions: 'Запитання та відповіді',
      settings: 'Налаштування',
      about: 'Про нас',
      account: 'Обліковий запис',
      history: 'Історія',
      favorites: 'Улюблене',
      email: 'E-mail: glow_up@gmail.com',
      phone: 'Телефон: 987-654-3210',
    },
    EN: {
      catalog: 'Catalog of services',
      specialists: 'Specialists',
      blog: 'Blog',
      questions: 'Questions and answers',
      settings: 'Settings',
      about: 'About us',
      account: 'Account',
      history: 'History',
      favorites: 'Favorites',
      email: 'E-mail: glow_up@gmail.com',
      phone: 'Phone: 987-654-3210',
    },
  };

  return (
      <footer className={footerClass}>
        <div className="footer-column">
          <ul>
            <li><a href="/catalog">{translations[language].catalog}</a></li>
            <li><a href="/specialists">{translations[language].specialists}</a></li>
            <li><a href="/blog">{translations[language].blog}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <ul>
            <li><a href="/faq">{translations[language].questions}</a></li>
            <li><a href="/settings">{translations[language].settings}</a></li>
            <li><a href="/404">404</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <ul>
            <li><a href="/about">{translations[language].about}</a></li>
            <li><a href="/account">{translations[language].account}</a></li>
            <li><a href="/history">{translations[language].history}</a></li>
            <li><a href="/favorites">{translations[language].favorites}</a></li>
          </ul>
        </div>

        <div className="footer-column contact-info">
          <p>{translations[language].email}</p>
          <p>{translations[language].phone}</p>
          <div className="footer-icons">
            <a href="https://www.instagram.com/">
              <FaInstagram size={24} />
            </a>
            <a href="https://web.telegram.org/">
              <FaTelegramPlane size={24} />
            </a>
            <a href="tel:987-654-3210">
              <FaPhoneAlt size={24} />
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
