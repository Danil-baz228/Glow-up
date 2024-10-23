import React, { useState } from "react";
import Slider from "react-slick";
import './css/HomePage/Services.css';
import img1 from './img/Services/1.png';
import img2 from './img/Services/2.png';
import img3 from './img/Services/3.png';
import img4 from './img/Services/4.png';
import img5 from './img/Services/5.png';
import img6 from './img/Services/6.png';
import img7 from './img/Services/7.png';
import img8 from './img/Services/8.png';
import img9 from './img/Services/9.png';
import img10 from './img/Services/10.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

const Services = () => {
  const [activeSlide, setActiveSlide] = useState(0); 

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px", 
    afterChange: current => setActiveSlide(current), 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  const slides = [
    { images: [img1, img2], title1: "ESTHETICIAN", title2: "Makeup Artist" },
    { images: [img3, img4], title1: "Hair Stylist", title2: "Barber" },
    { images: [img5, img6], title1: "Manicurist and Pedicurist", title2: "Eyelash Extension Specialist" },
    { images: [img7, img8], title1: "Brow Specialist", title2: "Sugaring and Waxing Specialist" },
    { images: [img9, img10], title1: "Massage Therapist", title2: "Permanent Makeup Artist" }
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeSlide ? 'activeSlide' : 'inactive'}`}
          >
            <div className="image-container">
              <div className="image-wrapper">
                <Link to="/blog"><img src={slide.images[0]} alt={slide.title1} className="slider-image" ></img></Link>
                <h3 className="text-container">{slide.title1}</h3>
              </div>
              <div className="image-wrapper">
                <Link to="/blog"><img src={slide.images[1]} alt={slide.title2} className="slider-image" /></Link>
                <h3 className="text-container">{slide.title2}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Services;
