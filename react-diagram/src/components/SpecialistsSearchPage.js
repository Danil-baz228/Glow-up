import React, { useState, useEffect } from 'react';
import './css/SpecialistsSearchPage/SpecialistsSearchPage.css';

const SpecialistsSearchPage = () => {
  const [specialists, setSpecialists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');  // Поле для локации осталось

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
    // Убрали locationParam из запроса к бэкенду
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
    // Оставлено для логики работы с локацией, но без связи с бэкендом
    console.log('Fetch user location logic here');
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container">
      <h1 className="title">All specialists</h1>
      
      <div className="search-container" placeholder="Find a specialist by name?">
        <input 
          type="text" 
          placeholder="Find a specialist by name" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
          <span className="search-icon"> &nbsp;⌕</span>
        </button>
      </div>

      <div className="categories-container">
        <h2 className="subtitle">Categories</h2>
        <h3 className='subtitle'>select one or more categories</h3>
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
          placeholder="Location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="location-input"
        />
        <button onClick={handleLocationSearch} className="my-location-button">
          My location
        </button>
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
          
          {/* Проверка на наличие occupation */}
          <p className="specialist-occupation">
            {specialist.Occupation ? specialist.Occupation.name : 'Occupation not found'}
          </p>
        </div>
      </div>
      <div className="specialist-footer">
        <div className="specialist-rating">
          <span className="star-icon">★</span>
          <span>{specialist.rating || 'No rating available'}</span>
        </div>
        <span className="specialist-price">${specialist.price || 'Price not available'}</span>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default SpecialistsSearchPage;
