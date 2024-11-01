import React, { useState, useEffect } from 'react';
import './css/SpecialistsSearchPage/SpecialistsSearchPage.css';
import MasterDetailsComponentSearch from './MasterDetailsComponentSearch';
import { useLanguage } from './LanguageContext';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const SpecialistsSearchPage = () => {
  const { language } = useLanguage();
  const authUser = useAuthUser();
  const clientId = authUser ? authUser.id : null;

  const [specialists, setSpecialists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const translations = {
    UA: {
      title: "Всі спеціалісти",
      searchPlaceholder: "Знайти спеціаліста за іменем",
      searchButton: "Пошук",
      categoriesTitle: "Професії",
      categoriesSubtitle: "Виберіть одну або кілька професій",
      locationPlaceholder: "Місцезнаходження",
      myLocation: "Моя локація",
      noSpecialistsFound: "Спеціалісти не знайдені"
    },
    EN: {
      title: "All Specialists",
      searchPlaceholder: "Find a specialist by name",
      searchButton: "Search",
      categoriesTitle: "Occupations",
      categoriesSubtitle: "Select one or more occupations",
      locationPlaceholder: "Location",
      myLocation: "My location",
      noSpecialistsFound: "No specialists found."
    }
  };

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
      console.log('Fetched specialists:', data);
    } catch (error) {
      console.error('Error searching specialists:', error);
    }
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
          {translations[language].searchButton}
          <span className="search-icon"> &nbsp;⌕</span>
        </button>
        {searchTerm && (
          <button onClick={clearSearch} className="clear-button">
            &times;
          </button>
        )}
      </div>

      <div className="categories-container">
        <h2 className="subtitle">{translations[language].categoriesTitle}</h2>
        <h3 className='subtitle-1'>{translations[language].categoriesSubtitle}</h3>
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

      <div className="specialists-grid">
        {specialists.length > 0 ? (
          specialists.map((specialist) => (
            <MasterDetailsComponentSearch 
              key={specialist.master_id} 
              master={specialist} 
              clientId={clientId}
            />
          ))
        ) : (
          <p>{translations[language].noSpecialistsFound}</p>
        )}
      </div>
    </div>
  );
};

export default SpecialistsSearchPage;
