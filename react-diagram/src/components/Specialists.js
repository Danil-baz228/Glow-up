import React, { useEffect, useState } from 'react';
import './css/HomePage/Specialists.css';

const Specialists = () => {
  const [masters, setMasters] = useState([]);
  const [totalMasters, setTotalMasters] = useState(0);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await fetch('/api/masters/random/5');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMasters(data.masters);
        setTotalMasters(data.totalMasters);
      } catch (error) {
        console.error('Error fetching masters:', error);
      }
    };
    fetchMasters();
  }, []);

  const getCircleColor = (gender) => {
    switch (gender) {
      case 'male':
        return 'circle-male';
      case 'female':
        return 'circle-female';
      case 'other':
        return 'circle-other';
      default:
        return 'circle-default';
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getImagePath = (avatarUrl) => {
    return avatarUrl ? `/images/masters/${avatarUrl}` : '';
  };

  return (
    <div className="specialists-container">
      <h2 className="specialists-title">Specialists</h2>
      <div className="specialists-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        {masters.map((master, index) => (
          <div key={index} className="specialist-item">
            <div className={`specialist-avatar-container ${getCircleColor(master.gender)}`}>
              <div className="specialist-avatar">
                {master.avatar_url ? (
                  <img
                    src={getImagePath(master.avatar_url)}
                    alt={`${master.first_name} ${master.last_name}`}
                    className="specialist-image"
                    onError={(e) => {
                      console.error(`Failed to load image: ${e.target.src}`);
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <div className="specialist-initials">
                    {getInitials(master.first_name, master.last_name)}
                  </div>
                )}
              </div>
            </div>
            <div className="specialist-name">{master.first_name} {master.last_name}</div>
          </div>
        ))}
        <div className="specialist-item">
          <div className="specialist-avatar-container circle-more">
            <div className="specialist-avatar">
              <span className="more-specialists">+{totalMasters-5}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialists;