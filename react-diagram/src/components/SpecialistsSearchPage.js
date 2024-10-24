import React, { useState, useEffect } from 'react';
import './css/SpecialistsSearchPage/SpecialistsSearchPage.css';
import { useLanguage } from './LanguageContext'; // Importing the useLanguage hook

const SpecialistsSearchPage = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const [specialists, setSpecialists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/occupations');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    const categoriesParam = selectedCategories.length > 0 ? selectedCategories.join(',') : '';
    try {
      const response = await fetch(`/api/masters/search?term=${searchTerm}&categories=${categoriesParam}`);
      if (!response.ok) {
        throw new Error('Failed to fetch specialists');
      }
      const data = await response.json();
      setSpecialists(data);
    } catch (error) {
      console.error('Error searching specialists:', error);
    }
  };

  const handleLocationSearch = () => {
    console.log('Fetch user location logic here');
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearLocation = () => {
    setLocation('');
  };

  // Translations for the page
  const translations = {
    UA: {
      title: "Всі спеціалісти",
      searchPlaceholder: "Знайти спеціаліста за іменем",
      categoriesTitle: "Категорії",
      categoriesSubtitle: "Виберіть одну або кілька категорій",
      locationPlaceholder: "Місцезнаходження",
      myLocation: "Моя локація",
      noRating: "Оцінка недоступна",
      noPrice: "Ціна недоступна",
      noReviews: "Ще немає відгуків",
    },
    EN: {
      title: "All specialists",
      searchPlaceholder: "Find a specialist by name",
      categoriesTitle: "Categories",
      categoriesSubtitle: "Select one or more categories",
      locationPlaceholder: "Location",
      myLocation: "My location",
      noRating: "No rating available",
      noPrice: "Price not available",
      noReviews: "No reviews yet",
    },
  };

  return (
      <div className="container">
        <h1 className="title">{translations[language].title}</h1>

        <div className="search-container">
          <input
              type="text"
              placeholder={translations[language].searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
            <span className="search-icon"> &nbsp;⌕</span>
          </button>
          {searchTerm && (
              <button onClick={clearSearch} className="clear-button">
                &times; {/* Символ крестика */}
              </button>
          )}
        </div>

        <div className="categories-container">
          <h2 className="subtitle">{translations[language].categoriesTitle}</h2>
          <h3 className='subtitle'>{translations[language].categoriesSubtitle}</h3>
          <div className="categories-list">
            {categories.map((category) => (
                <button
                    key={category.occupation_id}
                    className={`category-button ${selectedCategories.includes(category.name) ? "active" : ""}`}
                    onClick={() => toggleCategory(category.name)}
                >
                  {category.name}
                </button>
            ))}
          </div>
        </div>

        <div className="my-location-container">
          <input
              type="text"
              placeholder={translations[language].locationPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-input"
          />
          <button onClick={handleLocationSearch} className="my-location-button">
            {translations[language].myLocation}
          </button>
          {location && (
              <button onClick={clearLocation} className="clear-button">
                &times; {/* Символ крестика */}
              </button>
          )}
        </div>

        <div className="specialists-grid">
          {specialists.map((specialist) => (
              <div key={specialist.master_id} className="specialist-card">
                <div className="specialist-header">
                  <div className="specialist-avatar">
                    {specialist.avatar_url ? (
                        <img
                            src={`/images/masters/${specialist.avatar_url}`}
                            alt={`${specialist.first_name} ${specialist.last_name}`}
                            className="avatar-image"
                        />
                    ) : (
                        <div className="avatar-initials">
                          {specialist.first_name[0]}{specialist.last_name[0]}
                        </div>
                    )}
                  </div>
                  <div className="specialist-info">
                    <h3 className="specialist-name">{specialist.first_name} {specialist.last_name}</h3>
                    <p className="specialist-occupation">
                      {specialist.Occupation ? specialist.Occupation.name : 'Occupation not found'}
                    </p>
                  </div>
                </div>
                <div className="specialist-footer">
                  <div className="specialist-rating">
                    <span className="star-icon">★</span>
                    <span>{specialist.rating || translations[language].noRating}</span>
                  </div>
                  <span className="specialist-price">${specialist.price || translations[language].noPrice}</span>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SpecialistsSearchPage;
