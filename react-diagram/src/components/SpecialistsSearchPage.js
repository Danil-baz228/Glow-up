import React, { useState, useEffect } from 'react';
import './css/SpecialistsSearchPage/SpecialistsSearchPage.css';
import MasterDetailsComponentSearch from './MasterDetailsComponentSearch';

const SpecialistsSearchPage = () => {
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

  return (
    <div className="container">
      <h1 className="title">All Specialists</h1>
      
      <div className="search-container">
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
        {searchTerm && (
          <button onClick={clearSearch} className="clear-button">
            &times; {/* Символ крестика */}
          </button>
        )}
      </div>

      <div className="categories-container">
        <h2 className="subtitle">Occupations</h2>
        <h3 className='subtitle-1'>select one or more occupations</h3>
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

{/* 
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
  {location && (
    <button onClick={clearLocation} className="clear-button">
      &times;
    </button>
  )}
</div>
*/}


      <div className="specialists-grid">
        {specialists.map((specialist) => (
          <MasterDetailsComponentSearch key={specialist.master_id} master={specialist} />
        ))}
      </div>
    </div>
  );
};

export default SpecialistsSearchPage;
