import React, {useState} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MainLayout.css';
import AuthComponent from "../components/AuthComponent";

const MainLayout = ({ isAuthModalOpen, setIsAuthModalOpen, toggleAuthModal }) => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="layout-container">
      {!isHomePage && <div className={`hederclas`}>
        <Header toggleAuthModal={toggleAuthModal}/>
      </div>}

      <main>
          {isAuthModalOpen && <AuthComponent setIsAuthModalOpen={setIsAuthModalOpen}
          />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
