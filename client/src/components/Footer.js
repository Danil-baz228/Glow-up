import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <p>Catalog of services</p>
          <p>Specialists</p>
          <p>Blog</p>
        </div>
        <div className="footer-column">
          <p>Questions and answers</p>
          <p>Settings</p>
          <p>404</p>
        </div>
        <div className="footer-column">
          <p>About us</p>
          <p>Account</p>
          <p>History</p>
          <p>Favorites</p>
        </div>
        <div className="footer-column">
          <p>E-mail: glow_up@gmail.com</p>
          <p>Phone: 987-654-3210</p>
        </div>
        <div className="footer-column">
          <p>Contacts</p>
          <div className="social-icons">
            <span>📷</span> {/* Instagram */}
            <span>✈️</span> {/* Telegram */}
            <span>💬</span> {/* WhatsApp */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Glow Up | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;