import React, { useState } from 'react';
import Pagination from './components/Pagination';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import './App.css';
// Правильные пути к изображениям
const images = [
  { src: `${process.env.PUBLIC_URL}/assets/1.png`, text: 'Anti-Cellulite Treatments' },
  { src: `${process.env.PUBLIC_URL}/assets/2.png`, text: 'Chemical Peels (Glycolic, Salicylic, TCA)' },
  { src: `${process.env.PUBLIC_URL}/assets/3.png`, text: 'Botox and Fillers' },
  { src: `${process.env.PUBLIC_URL}/assets/1.png`, text: 'Facial Treatments (Anti-aging, Hydrating, Deep Cleansing)' },
  { src: `${process.env.PUBLIC_URL}/assets/2.png`, text: 'Skin Rejuvenation Treatments' },
  { src: `${process.env.PUBLIC_URL}/assets/3.png`, text: 'Microdermabrasion' },
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Количество изображений на одной странице
  const totalPages = Math.ceil(images.length / itemsPerPage);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Header />  
      <ProfilePage />
      
     
      <Pagination/>
      <Footer />
      
    </div>
  );
}

export default App;