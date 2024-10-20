import React, { useState } from "react";
import Slider from "react-slick";
import './css/HomePage/Services.css';
import img1 from './img/Services/msage1.png';
import img2 from './img/Services/msage2.png';
import img3 from './img/Services/eastetik1.png';
import img4 from './img/Services/eastetik2.png';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
    { images: [img1, img2], title1: "ESTHETICIAN", title2: "MASSAGE THERAPIST" },
    { images: [img3, img4], title1: "NAIL TECHNICIAN", title2: "NAIL TECHNICIAN" },
    { images: [img1, img2], title1: "ESTHETICIAN", title2: "MASSAGE THERAPIST" },
    { images: [img3, img4], title1: "NAIL TECHNICIAN", title2: "NAIL TECHNICIAN" },
    { images: [img1, img2], title1: "ESTHETICIAN", title2: "MASSAGE THERAPIST" }
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeSlide ? 'activeSlide' : 'inactive'}`} // Применение классов
          >
            <div className="image-container">
              <div className="image-wrapper">
                <img src={slide.images[0]} alt={slide.title1} className="slider-image" />
                <h3 className="text-container">{slide.title1}</h3>
              </div>
              <div className="image-wrapper">
                <img src={slide.images[1]} alt={slide.title2} className="slider-image" />
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
