import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Импорт useLocation
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation(); 

  const isHomePage = location.pathname === '/';

  return (
    <div className="layout-container">
      {!isHomePage && <div className={`hederclas`}>
        <Header />
      </div>}
      
      <main>
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
