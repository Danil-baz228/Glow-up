import React, { useEffect, useState } from 'react';
import './css/HomePage/AboutUs.css';
import backgroundImage from './img/AboutUs/background.png'; 
import teamRow1 from './img/AboutUs/team-row-1.png'; 
import teamRow2 from './img/AboutUs/team-row-2.png'; 
import teamRow3 from './img/AboutUs/team-row-3.png'; 
import LogoAbimg from './img/AboutUs/LogoAboutUs.png';
import mainLogo from './img/AboutUs/mainLogo.png';
import Header from './Header'; 
const AboutUs = () => {
  
  return (
    
    <div className="about-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      
      <section className="about-section">
        <img src={mainLogo} alt="Logo" className="main-logo" />
        <h3 className="slogan">Find your Shine</h3>
        <p className="about-text">
          Our service "Glow up" was created in order to gather in one place specialists 
          who provide services in the field of beauty. Each specialist will promote 
          himself as an expert in his field with a completed portfolio. They can represent 
          themselves in private, as well as the beauty salon in which they work. 
          Our service allows specialists to expand their client base.
          <br />
          In turn, our service will make it easier for clients to find the master they need 
          with the help of filters and categories, as well as the opportunity to get to 
          know the works of the chosen specialist. 
          Our service "Glow up" will make it easier for clients to find a specialist, 
          and for specialists to find clients.
        </p>
      </section>

    

      <div className="team-section">
        <h2>Our team</h2>

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
        <h2>Our contacts</h2>
      </div>
    </div>
  );
};

const TeamMember = ({ name }) => (
  <div className="team-member">
    <img src="path-to-image" alt={name} className="team-photo" />
    <p>{name}</p>
  </div>
);

export default AboutUs;
