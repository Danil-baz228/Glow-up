import React, { useEffect, useState } from 'react';
import Header from './Header'; 
import Services from './Services'; 
import './css/HomePage/HomePage.css';
import teamRow from './img/Spec.png'; 
import placeholder1 from './img/placeholder.png'; 


const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="homepage">
      <header className={`main-header ${isScrolled ? 'hidden' : 'fade-in'}`}>
        <img src={placeholder1} alt="Service 1" />
        <h1 className="fade-in">Ласкаво просимо до Glow up!</h1>
        <p className="fade-in">Знайдіть свого майстра</p>
        <div className="header-buttons fade-in">
          <button className="primary-button">Підібрати майстра</button>
          <button className="secondary-button">Усі майстри</button>
        </div>
      </header>

      <div className={`sticky-header ${isScrolled ? 'fixed slide-in' : ''}`}>
        <Header isScrolled={isScrolled} />
      </div>

      <section className="statistics-section fade-in">
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

      
      <Services />
      

      <section className="discount-section fade-in">
        <h2>Отримайте <span className="highlight">15% знижку</span> на перше замовлення</h2>
        <input type="email" placeholder="Введіть вашу email адресу" />
        <button className="submit-button">Отримати</button>
      </section>

      <section className="info-section fade-in">
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

      <div className="team-section">
        <div className="team-row fade-in">
          <img src={teamRow} alt="Anastasiya and Andriy" className="team-row-img" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
