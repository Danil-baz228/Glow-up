import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import logo from './img/Logo.png'; 
import './css/Header.css'; 

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Beauty Unite Logo" className="header-logo-img" />
        <h1 className="header-title">Glow up</h1>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li><Link to="/">Main Page</Link></li>
          <li><Link to="/serviceCatalog">Service Catalog</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/questionsAnswers">Questions & Answers</Link></li>
          <li><Link to="/currentTopics">Current Topics</Link></li>
          <li><Link to="/additionalInfo">Additional Info</Link></li>
        </ul>
      </nav>
      <div className="header-auth">
        {user ? (
          <div>
            <span>Welcome, {user}!</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
