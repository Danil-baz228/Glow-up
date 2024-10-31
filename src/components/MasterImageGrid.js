// src/ImageGrid.js
import React, { useState,useEffect } from 'react';
import styles from './css/MasterPage/MasterImageGrid.module2.css'; // Стили для сетки изображений
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';

// Список изображений и текстов для ImageGrid (не портфолио)
export const defaultImages = [
  
    {  id: 1,src: img1, text: 'Anti-Cellulite Treatments' },
    {  id: 2,src: img2, text: 'Microdermabrasion' },
    {  id: 3,src: img3, text: 'Skin Rejuvenation Treatments' },
    {  id: 4, src: img1, text: 'Chemical Peels (Glycolic, Salicylic, TCA)' },
    {  id: 5,src: img2, text: 'Botox and Fillers' },
    {  id: 6,src: img3, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
    {  id: 7,src: img1, text: 'Eyebrow and Eyelash Tinting' },
    {  id: 8,src: img2, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
    {  id: 9,src: img3, text: 'Microdermabrasion' },
    {  id: 10,src: img1, text: 'Botox and Fillers' },
    {  id: 11,src: img2, text: 'Skin Rejuvenation Treatments' },
    {  id: 12,src: img3, text: 'Eyebrow and Eyelash Tinting' },
    {  id: 13,src: img1, text: 'Chemical Peels (Glycolic, Salicylic, TCA)' },
    {  id: 14,src: img2, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
    {  id: 15,src: img3, text: 'Skin Rejuvenation Treatments' },
    {  id: 16,src: img1, text: 'Anti-Cellulite Treatments' },
   
  ];

  const ImageGrid = ({ newImage }) => {
    const [allImages, setAllImages] = useState([...defaultImages]);
    const [selectedImage, setSelectedImage] = useState(null);
  
    // Функция для добавления нового изображения в начало массива
    const addImageToGrid = (image) => {
      setAllImages([image, ...allImages]);
    };
  
    // Используем эффект для добавления нового изображения, если newImage обновляется
    useEffect(() => {
      if (newImage) {
        addImageToGrid(newImage);
      }
    }, [newImage]);
  
    // Обработчик для удаления изображения
    const handleDelete = (id) => {
      const updatedImages = allImages.filter((img) => img.id !== id);
      setAllImages(updatedImages);
      setSelectedImage(null); // Закрыть режим выбора после удаления
    };
  
    // Обработчик для выбора изображения
    const handleSelectImage = (id) => {
      setSelectedImage(id);
    };
  
    return (
      <div className={styles.ImagegridContainer}>
        <div className="grid-container">
          {allImages.map((item) => (
            <div
              className={`grid-item ${selectedImage === item.id ? 'selected' : ''}`}
              key={item.id}
              onClick={() => handleSelectImage(item.id)}
            >
              <img src={item.src} alt={item.text} />
              <div className="grid-text">{item.text}</div>
              {selectedImage === item.id && (
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Предотвратить всплытие клика
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ImageGrid;
