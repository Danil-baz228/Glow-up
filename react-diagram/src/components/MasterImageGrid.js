import React from 'react';
import './css/MasterPage/MasterImageGrid.css'; // Подключение стилей для сетки изображений
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';

// Список изображений и текстов для ImageGrid (не портфолио)
const defaultImages = [
  { src: img1, text: 'Anti-Cellulite Treatments' },
  { src: img2, text: 'Microdermabrasion' },
  { src: img3, text: 'Skin Rejuvenation Treatments' },
  { src: img1, text: 'Chemical Peels (Glycolic, Salicylic, TCA)' },
  { src: img2, text: 'Botox and Fillers' },
  { src: img3, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
  { src: img1, text: 'Eyebrow and Eyelash Tinting' },
  { src: img2, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
  { src: img3, text: 'Microdermabrasion' },
  { src: img1, text: 'Botox and Fillers' },
  { src: img2, text: 'Skin Rejuvenation Treatments' },
  { src: img3, text: 'Eyebrow and Eyelash Tinting' },
  { src: img1, text: 'Chemical Peels (Glycolic, Salicylic, TCA)' },
  { src: img2, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
  { src: img3, text: 'Skin Rejuvenation Treatments' },
  { src: img1, text: 'Anti-Cellulite Treatments' },
];

const ImageGrid = ({ images = [] }) => {
  // Объединяем переданные изображения и изображения по умолчанию
  const allImages = [...images, ...defaultImages];

  return (
    <div className="grid-container">
      {defaultImages.map((item, index) => (
        <div className="grid-item" key={index}>
          <img src={item.src} alt={item.text} />
          <div className="grid-text">{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;

