import React, { useState } from 'react';
import './css/MasterPage/MasterProfilePage.css'
import profilePhoto from 'C:/Users/user/Desktop/Master_Final/client/src/assets/profile-photo.png';
import background from 'C:/Users/user/Desktop/Master_Final/client/src/assets/background.png';
import Services from './Services';
import About from './About';
import ImageGrid from './ImageGrid';
const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('portfolio'); // Состояние активной секции
  const [isModalOpen, setIsModalOpen] = useState(false); // Модальное окно
  const [headline, setHeadline] = useState(''); // Заголовок поста
  const [description, setDescription] = useState(''); // Описание поста
  const [photos, setPhotos] = useState([]); // Фотографии, добавленные для поста
  const [portfolio, setPortfolio] = useState([]); // Хранилище постов в портфолио

  // Функция для загрузки файлов
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file)); // Преобразуем в URL для отображения
    setPhotos((prevPhotos) => [...prevPhotos, ...fileURLs]); // Добавляем фото в портфолио
  };

  // Функция для сохранения поста в портфолио
  const handleSaveToPortfolio = () => {
    const newPost = {
      headline,
      description,
      photos,
    };
    setPortfolio([...portfolio, newPost]); // Сохраняем новый пост в портфолио

    // Очистка полей после сохранения
    setHeadline('');
    setDescription('');
    setPhotos([]);
    setIsModalOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'portfolio':
        return(
          <div className="portfolio-gallery">
            {portfolio.map((post, index) => (
              <div key={index} className="portfolio-item">
                <h3>{post.headline}</h3>
                <p>{post.description}</p>
                <div className="portfolio-photos">
                  {post.photos.map((photo, i) => (
                    <img key={i} src={photo} alt={`Portfolio ${i}`} />
                  ))}
                </div>
              </div>
            ))} 
          </div>
        );
        
      case 'services':
        return <Services />; // Компонент Services для вкладки "Services"
      case 'reviews':
        return <div>Reviews Section</div>;
      case 'about':
        return <About/>;
      case 'location':
        return <div>Location Section</div>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <div className="breadcrumb"></div>

      <div className="profile-header">
        <div className="profile-background" style={{ backgroundImage: `url(${background})` }}>
          <div className="profile-photo-container">
            <img src={profilePhoto} alt="Profile" className="profile-photo" />
          </div>
        </div>
        <div className="profile-info">
          <h2>Olga Tsyganenko</h2>
          <span>Esthetician</span>
          <div className="profile-actions">
            <button className="chat-button">My chats</button>
            <button className="appointment-button">Appointments</button>
            <button className="edit-button">Edit profile</button>
          </div>
        </div>
      </div>

      <div className="profile-navigation">
        <nav>
          <a href="#portfolio" onClick={() => setActiveSection('portfolio')}>Portfolio</a>
          <a href="#services" onClick={() => setActiveSection('services')}>Services</a>
          <a href="#reviews" onClick={() => setActiveSection('reviews')}>Reviews</a>
          <a href="#about" onClick={() => setActiveSection('about')}>About</a>
          <a href="#location" onClick={() => setActiveSection('location')}>Location</a>
        </nav>
      </div>

      <div className="portfolio-page">
        {activeSection === 'portfolio' && (
          <div className="add-photo-container">
            <button className="add-photo-btn" onClick={() => setIsModalOpen(true)}>
              Add photo to portfolio
            </button>
<ImageGrid/>

          </div>
        )}

        <div className="profile-section-content">
          {renderSection()}
        </div>

        {/* Модальное окно для добавления фото в портфолио */}
        {isModalOpen && (
   
          <div className="modal-overlay">
            
            <div className="modal-content">
              <div className="modal-left">
              <h1 >⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀Create Post</h1>
                {photos.length > 0 ? (
                  <div className="photo-slider">
                    {photos.map((photo, index) => (
                      <div key={index} className="photo-slide">
                        <img src={photo} alt={`Slide ${index}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  
                  <div className="photo-placeholder">
                    <p>No photos added yet.</p>
                  </div>
                )}
            
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                
                <button
                  className="upload-photo-btn"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  Upload Photos
                </button>
              </div>

              <div className="modal-right" >
                <h4>Headline</h4>
                <input 
                  type="text"
                  placeholder=""
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="headline-input"
                />
                  <h4>Description</h4>
                <textarea 
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="description-input"
                />
                <button className="save-btn" onClick={handleSaveToPortfolio}>
                  Add to portfolio
                </button>
              </div>

              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
               
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
