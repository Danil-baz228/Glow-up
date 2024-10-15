import React, { useEffect, useState } from 'react';
import Header from './Header'; 
import './css/HomePage/HomePage.css';
import placeholder from './img/placeholder.jpg'; 
import placeholder1 from './img/placeholder.png'; 
import './css/HomePage/Reviews.css';
import Specialists from './Specialists.js';
import AuthComponent from "./AuthComponent";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const authUser = useAuthUser();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  return (
    <div className="homepage">
      
      <header className={`main-header ${isScrolled ? 'hidden' : ''}`}>
        <img src={placeholder1} alt="Service 1" />
        <h1>Ласкаво просимо до Glow up!</h1>
        <p>Знайдіть свого майстра</p>
        <div className="header-buttons">
          <button className="primary-button">Підібрати майстра</button>
          <button className="secondary-button">Усі майстри</button>
        </div>
      </header>

      <div className={`sticky-header ${isScrolled ? 'fixed' : ''}`}>
        <Header toggleAuthModal={toggleAuthModal}/>
      </div>

      {isAuthModalOpen && <AuthComponent
        setIsAuthModalOpen={setIsAuthModalOpen}
      />}

      <section className="statistics-section">
        <div className="stat-item">
          <h2>1235</h2>
          <p>Майстрів</p>
        </div>
        <div className="stat-item">
          <h2>5789</h2>
          <p>Клієнтів</p>
        </div>
        <div className="stat-item">
          <h2>100%</h2>
          <p>Позитивні відгуки</p>
        </div>
      </section>

      <section className="services-section">
        <h2>Послуги</h2>
        <div className="services">
          <div className="service-card">
            <img src={placeholder} alt="Service 1" />
            <p>Esthetician</p>
          </div>
          <div className="service-card">
            <img src={placeholder} alt="Service 2" />
            <p>Massage Therapist</p>
          </div>
        </div>
      </section>

      <Specialists />

      {!authUser && (
          <>
            <section className="discount-section">
              <h2>Отримайте <span className="highlight">15% знижку</span> на перше замовлення</h2>
              <input type="email" placeholder="Введіть вашу email адресу" />
              <button className="submit-button">Отримати</button>
            </section>

            <section className="info-section">
              <div className="info-card">
                <h3>Для клієнтів</h3>
                <p>Ми допоможемо вам знайти свого майстра для ідеального образу.</p>
                <button className="info-button">Веб-кабінет клієнта</button>
              </div>
              <div className="info-card">
                <h3>Для майстрів</h3>
                <p>Станьте частиною нашої спільноти майстрів.</p>
                <button className="info-button">Веб-кабінет майстра</button>
              </div>
            </section>
          </>
      )}
    </div>
  );
};

export default HomePage;
