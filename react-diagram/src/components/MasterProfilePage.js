<<<<<<< Updated upstream:react-diagram/src/components/MasterProfilePage.js
import React, { useState } from 'react';
import './css/MasterPage/MasterProfilePage.css'
=======
import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; 
>>>>>>> Stashed changes:client/src/components/ProfilePage.js
import profilePhoto from 'C:/Users/user/Desktop/Master_Final/client/src/assets/profile-photo.png';
import background from 'C:/Users/user/Desktop/Master_Final/client/src/assets/background.png';
import Services from './Services';
import About from './About';
import img from 'C:/Users/user/Desktop/Master_Final/client/src/icons/free-icon-font-add-image-13727345.png';
import ImageGrid from './ImageGrid';
import Pagination from './Pagination';

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
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setPhotos((prevPhotos) => [...prevPhotos, ...fileURLs]);
    setIsModalOpen(false);
    setIsSecondModalOpen(true);
  };
  
  {photos.length > 0 && photos.map((photo, index) => (
    <img key={index} src={photo} alt="Preview" />
  ))}

  // Функция для смены страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Функция для сохранения поста в портфолио
  const handleSaveToPortfolio = () => {
    if (!photos.length || !headline || !description) return;

    const newPost = {
      src: photos[0],
      text: headline,
      text:description,
    };

    let updatedImages = [newPost, ...images];
    setImages(updatedImages);
    setHeadline('');
    setDescription('');
    setPhotos([]);
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
           {isEditingProfile ? (
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
              <button onClick={handleProfileSave}>Save</button>
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
              <div className="second-modal-header">
                <h2>Create a post</h2>
                <button className="close-modal-btn" onClick={() => setIsSecondModalOpen(false)}>
                  &times;
                </button>
              </div>
              <div className="second-modal-body">
                <div className="image-preview">
                  {photos.length > 0 && <img src={photos[0]} alt="Preview" />}
                </div>
                <div className="post-details">
                  <h3>Headline</h3>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="headline-input"
                  />
                  <h4>Description</h4>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    maxLength={maxDescriptionLength}
                    className="description-input"
                  />
                  <div className="char-counter">
                    {description.length}/{maxDescriptionLength}
                  </div>
                </div>
              </div>
              <div className="second-modal-footer">
                <button className="save-btn" onClick={handleSaveToPortfolio}>
                  Add to portfolio
                </button>
              </div>
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
  );
};

export default ProfilePage;
