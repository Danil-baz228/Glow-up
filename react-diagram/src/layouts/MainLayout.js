import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'; 
import Footer from '../components/Footer';  
import './MainLayout.css';
import AuthComponent from "../components/AuthComponent";

const MainLayout = ({ isAuthModalOpen, setIsAuthModalOpen, toggleAuthModal }) => {

  return (
    <div className="layout-container">
      <Header toggleAuthModal={toggleAuthModal}/>
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
