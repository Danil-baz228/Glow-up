import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; 
import MainPage from './components/MainPage';
import ServiceCatalog from './components/ServiceCatalog';
import Statistics from './components/Statistics';
import Reviews from './components/Reviews';
import QuestionsAnswers from './components/QuestionsAnswers';
import CurrentTopics from './components/CurrentTopics';
import AdditionalInfo from './components/AdditionalInfo';
import ErrorPage from './components/ErrorPage'; 
import AuthPage from './components/AuthPage'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="serviceCatalog" element={<ServiceCatalog />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="questionsAnswers" element={<QuestionsAnswers />} />
          <Route path="currentTopics" element={<CurrentTopics />} />
          <Route path="additionalInfo" element={<AdditionalInfo />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
