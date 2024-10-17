import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './components/HomePage';  
import ServiceCatalog from './components/ServiceCatalog';
import Statistics from './components/Statistics';
import Reviews from './components/Reviews';
import QuestionsAnswers from './components/QuestionsAnswers';
import CurrentTopics from './components/AboutUs';
import AdditionalInfo from './components/AdditionalInfo';
import ErrorPage from './components/ErrorPage';
import AuthPage from './components/AuthPage';
import { AuthProvider } from './components/AuthContext';
import { LanguageProvider } from './components/LanguageContext'; 
import ProtectedRoute from './components/ProtectedRoute';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Компонент для прокрутки на верх
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <ScrollToTop /> {/* Добавляем компонент для сброса прокрутки */}
          <Routes>
            <Route path="/" element={<MainLayout />} >
              <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="serviceCatalog" element={<ProtectedRoute><ServiceCatalog /></ProtectedRoute>} />
              <Route path="statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
              <Route path="reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
              <Route path="questionsAnswers" element={<ProtectedRoute><QuestionsAnswers /></ProtectedRoute>} />
              <Route path="currentTopics" element={<ProtectedRoute><CurrentTopics /></ProtectedRoute>} />
              <Route path="additionalInfo" element={<ProtectedRoute><AdditionalInfo /></ProtectedRoute>} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
