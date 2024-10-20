import React from 'react';
import './css/HomePage/AboutUs.css';
import backgroundImage from './img/AboutUs/background.png'; 
import teamRow1 from './img/AboutUs/team-row-1.png'; 
import teamRow2 from './img/AboutUs/team-row-2.png'; 
import teamRow3 from './img/AboutUs/team-row-3.png'; 
import LogoAbimg from './img/AboutUs/LogoAboutUs.png';
import mainLogo from './img/AboutUs/mainLogo.png';
import { useLanguage } from './LanguageContext'; // Импортируем контекст языка

const AboutUs = () => {
  const { language } = useLanguage(); // Используем язык из контекста

  const translations = {
    UA: {
      slogan: 'Знайдіть свій блиск',
      aboutText: `Наш сервіс "Glow up" був створений для того, щоб зібрати в одному місці спеціалістів, 
                  які надають послуги в сфері краси. Кожен спеціаліст представляє себе як експерта 
                  у своїй галузі з готовим портфоліо. Вони можуть представляти себе у приватному 
                  порядку, а також салон краси, в якому працюють. Наш сервіс дозволяє спеціалістам 
                  розширити свою клієнтську базу. 
                  У свою чергу, наш сервіс полегшить клієнтам пошук необхідного майстра 
                  за допомогою фільтрів і категорій, а також можливістю ознайомитися 
                  з роботами обраного спеціаліста. 
                  Наш сервіс "Glow up" зробить пошук спеціаліста легшим для клієнтів 
                  і пошук клієнтів легшим для спеціалістів.`,
      ourTeam: 'Наша команда',
      ourContacts: 'Наші контакти',
    },
    EN: {
      slogan: 'Find your Shine',
      aboutText: `Our service "Glow up" was created in order to gather in one place specialists 
                  who provide services in the field of beauty. Each specialist will promote 
                  himself as an expert in his field with a completed portfolio. They can represent 
                  themselves in private, as well as the beauty salon in which they work. 
                  Our service allows specialists to expand their client base.
                  In turn, our service will make it easier for clients to find the master they need 
                  with the help of filters and categories, as well as the opportunity to get to 
                  know the works of the chosen specialist. 
                  Our service "Glow up" will make it easier for clients to find a specialist, 
                  and for specialists to find clients.`,
      ourTeam: 'Our Team',
      ourContacts: 'Our Contacts',
    },
  };

  return (
    <div className="about-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      
      <section className="about-section">
        <img src={mainLogo} alt="Logo" className="main-logo" />
        <h3 className="slogan">{translations[language].slogan}</h3>
        <p className="about-text">{translations[language].aboutText}</p>
      </section>

      <div className="team-section">
        <h2>{translations[language].ourTeam}</h2>
        <div className="team-logo">
          <img src={LogoAbimg} alt="Logo" className="team-logo-img" />
        </div>
        <div className="team-row">
          <img src={teamRow1} alt="Anastasiya and Andriy" className="team-row-img" />
        </div>
        <div className="team-row">
          <img src={teamRow2} alt="4 team members" className="team-row-img" />
        </div>
        <div className="team-row">
          <img src={teamRow3} alt="4 more team members" className="team-row-img" />
        </div>
        <h2>{translations[language].ourContacts}</h2>
      </div>
    </div>
  );
};

export default AboutUs;
