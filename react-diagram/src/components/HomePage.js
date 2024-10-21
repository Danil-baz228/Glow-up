import React, { useState, useEffect } from 'react';
import Header from './Header';
import Services from './Services';
import './css/HomePage/HomePage.css';
import './css/HomePage/Reviews.css';
import Specialists from './Specialists.js';
import HomePageReviews from './HomePageReviews.js';
import placeholder1 from './img/placeholder.png';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useLanguage } from './LanguageContext';

const HomePage = ({toggleAuthModal}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authUser = useAuthUser();
  const { language } = useLanguage();

  const translations = {
    UA: {
      welcome: 'Ласкаво просимо до Glow up!',
      findMaster: 'Знайдіть свого майстра',
      chooseMaster: 'Підібрати майстра',
      allMasters: 'Усі майстри',
      mastersCount: 'Майстрів',
      clientsCount: 'Клієнтів',
      positiveReviews: 'Позитивні відгуки',
      discount: 'Отримайте 15% знижку на перше замовлення',
      emailPlaceholder: 'Введіть вашу email адресу',
      getButton: 'Отримати',
      forClients: 'Для клієнтів',
      clientHelp: 'Ми допоможемо вам знайти свого майстра для ідеального образу.',
      clientCabinet: 'Веб-кабінет клієнта',
      forMasters: 'Для майстрів',
      mastersCommunity: 'Станьте частиною нашої спільноти майстрів.',
      mastersCabinet: 'Веб-кабінет майстра',
    },
    EN: {
      welcome: 'Welcome to Glow up!',
      findMaster: 'Find your master',
      chooseMaster: 'Choose a master',
      allMasters: 'All masters',
      mastersCount: 'Masters',
      clientsCount: 'Clients',
      positiveReviews: 'Positive reviews',
      discount: 'Get a 15% discount on your first order',
      emailPlaceholder: 'Enter your email address',
      getButton: 'Get',
      forClients: 'For Clients',
      clientHelp: 'We will help you find your master for the perfect look.',
      clientCabinet: 'Client Cabinet',
      forMasters: 'For Masters',
      mastersCommunity: 'Become part of our community of masters.',
      mastersCabinet: 'Masters Cabinet',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <div className="homepage">
        <div className="header-container">
          <header className={`main-header ${isScrolled ? 'hidden' : 'fade-in'}`}>
            <div className="component-header">
              <img src={placeholder1} alt="Service 1"/>
              <h1 className="fade-in">{translations[language].welcome}</h1>
              <p className="fade-in">{translations[language].findMaster}</p>
              <div className="header-buttons fade-in">
                <button className="primary-button">{translations[language].chooseMaster}</button>
                <button className="secondary-button">{translations[language].allMasters}</button>
              </div>
            </div>
          </header>

          <div className={`sticky-header ${isScrolled ? 'fixed slide-in' : ''}`}>
            <Header toggleAuthModal={toggleAuthModal} isScrolled={isScrolled}/>
            <div className="hamburger" onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {isMenuOpen && (
                <nav className="dropdown-menu">
                  <ul>
                    <li>Menu Item 1</li>
                    <li>Menu Item 2</li>
                    <li>Menu Item 3</li>
                  </ul>
                </nav>
            )}
          </div>
        </div>



        <section className="statistics-section fade-in">
          <div className="stat-item">
            <h2>1235</h2>
            <p>{translations[language].mastersCount}</p>
          </div>
          <div className="stat-item">
            <h2>5789</h2>
            <p>{translations[language].clientsCount}</p>
          </div>
          <div className="stat-item">
            <h2>100%</h2>
            <p>{translations[language].positiveReviews}</p>
          </div>
        </section>
        <Services />
        {!authUser && (
            <>
              <section className="discount-section fade-in">
                <h2>{translations[language].discount}</h2>
                <input type="email" placeholder={translations[language].emailPlaceholder} />
                <button className="submit-button">{translations[language].getButton}</button>
              </section>

              <section className="info-section fade-in">
                <div className="info-card">
                  <h3>{translations[language].forClients}</h3>
                  <p>{translations[language].clientHelp}</p>
                  <button className="info-button">{translations[language].clientCabinet}</button>
                </div>
                <div className="info-card">
                  <h3>{translations[language].forMasters}</h3>
                  <p>{translations[language].mastersCommunity}</p>
                  <button className="info-button">{translations[language].mastersCabinet}</button>
                </div>
              </section>
            </>
        )}

        <Specialists />
        <HomePageReviews />
      </div>
  );
};

export default HomePage;
