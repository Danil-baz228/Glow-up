import React, { useState,useEffect } from 'react';
import styles from './css/MasterPage/MasterProfilePage.module1.css'
import profilePhoto from '../assets/profile-photo.png';
import background from '../assets/background.png';
import Services from './MasterServicesPage';
import About from './MasterAbout';
import img from '../icons/free-icon-font-add-image-13727345.png';
import ImageGrid from './MasterImageGrid';
import Pagination from './MasterPagination';
import axios from 'axios';
import { defaultImages } from './MasterImageGrid';
const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState('portfolio');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [images, setImages] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState('Olga Tsyganenko');
  const [specialization, setSpecialization] = useState('Esthetician');
  const [backgroundImage, setBackgroundImage] = useState(background);
  const [allImages, setAllImages] = useState([...defaultImages]);
  const maxDescriptionLength = 900;
  const photosPerPage = 16;

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = images.slice(indexOfFirstPhoto, indexOfLastPhoto);

  useEffect(() => {
    const storedImages = localStorage.getItem('portfolioImages');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  // Сохранение изображений в localStorage при обновлении массива images
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('portfolioImages', JSON.stringify(images));
    }
  }, [images]);
  const handleProfileEdit = () => {
    setIsEditingProfile(true);
  };
  const handleProfileSave = () => {
    setIsEditingProfile(false);
  };
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };
  // Функция для загрузки файлов
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Обновляем состояние с новым фото
      const newPhoto = response.data.imagePath;
      setImages([newPhoto, ...images]);
      setIsModalOpen(false);
     
    } catch (error) {
      console.error("Ошибка при загрузке фото:", error);
    } setIsSecondModalOpen(true);
  };
  // Функция для смены страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Функция для сохранения поста в портфолио

  const handleSaveToPortfolio = async () => {
    const newImage = {
      id: Date.now(), // уникальный идентификатор
      src: photos[0], // ссылка на фото
      text: headline || "New Portfolio Image" // Заголовок или текст по умолчанию
    };
  
    // Добавление нового изображения в начало массива allImages
    setAllImages([newImage, ...allImages]);
  
    // Закрытие модального окна после добавления
    setIsSecondModalOpen(false);
  };
  // Функция для изменения описания
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsThirdModalOpen(true);
  };

  const closeThirdModal = () => {
    setIsThirdModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleDeletePhoto = () => {
    const updatedImages = images.filter((img) => img !== selectedPhoto);
    setImages(updatedImages);
    closeThirdModal();
  };

  const handleEditPhoto = () => {
    setHeadline(selectedPhoto.headline);
    setDescription(selectedPhoto.description);
    setPhotos([selectedPhoto.src]);
    setIsSecondModalOpen(true);
    closeThirdModal();
  };
  const renderSection = () => {
    switch (activeSection) {
      case 'portfolio':
        return (
          <div className="portfolio-gallery">
            {portfolio.map((post, index) => (
              <div key={index} className="portfolio-item">
                <h3>{post.headline}</h3>
                <p>{post.description}</p>
                <div className="portfolio-photos">
                  {post.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt={`Portfolio ${i}`}
                      onClick={() => handlePhotoClick(photo)} // Добавляем обработчик нажатия на фото
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'services':
        return <Services />;
      case 'reviews':
        return <div>Reviews Section</div>;
      case 'about':
        return <About />;
      case 'location':
        return <div>Reviews Section</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.ProfilePageContainer}>
      <div className="profile-page">
        <div className="breadcrumb"></div>
  
        <div className="profile-header">
          <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})`, key: backgroundImage }}>
            <div className="profile-photo-container">
              <img src={profilePhoto} alt="Profile" className="profile-photo" />
            </div>
          </div>
          <div className="profile-info">
            {isEditingProfile ? (
              <div className="change-profile">
                <div>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name"
                  />
                  <input 
                    type="text" 
                    value={specialization} 
                    onChange={(e) => setSpecialization(e.target.value)} 
                    placeholder="Enter your specialization"
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBackgroundChange} 
                  />
                  <div className="change-save-edit">
                    <button onClick={handleProfileSave}>Save</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2>{name}</h2>
                <span>{specialization}</span>
                <div className="profile-actions">
                  <button className="appointment-button">Appointments</button>
                  <button className="edit-button" onClick={handleProfileEdit}>Edit profile</button>
                </div>
              </div>
            )}
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
              <ImageGrid images={currentPhotos} />
            </div>
          )}
          {renderSection()}
  
          {isModalOpen && (
            <div className="modal1-overlay">
              <div className="modal1-content">
                <div className="modal1-header">
                  <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                    &times;
                  </button>
                  <h2>Create Post</h2>
                </div>
                <div className="modal1-body">
                  <div className="modal1-icon">
                    <img src={img} alt="Create post icon" />
                  </div>
                  <label htmlFor="file-input" className="select-photo">
                    Select photo from computer
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
          )}
  
          {isSecondModalOpen && (
            <div className="second-modal-overlay">
              <div className="second-modal-content">
                <h2>Create a post</h2>
                <button onClick={() => setIsSecondModalOpen(false)}>&times;</button>
                <img src={photos[0]} alt="Preview" />
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Headline"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={maxDescriptionLength}
                  placeholder="Description"
                />
                <button onClick={handleSaveToPortfolio}>Add to portfolio</button>
              </div>
            </div>
          )}
  
          {isThirdModalOpen && selectedPhoto && (
            <div className="third-modal-overlay">
              <div className="third-modal-content">
                <img src={selectedPhoto.src} alt="Selected" />
                <h3>{selectedPhoto.headline}</h3>
                <p>{selectedPhoto.description}</p>
                <button onClick={handleEditPhoto}>Edit</button>
                <button onClick={handleDeletePhoto}>Delete</button>
                <button onClick={closeThirdModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );}
export default ProfilePage;
