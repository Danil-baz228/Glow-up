import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './components/HomePage';  
import ServiceCatalog from './components/ServiceCatalog';
import Statistics from './components/Statistics';
import Reviews from './components/Reviews';
import QuestionsAnswers from './components/QuestionsAnswers';
import CurrentTopics from './components/CurrentTopics';
import AdditionalInfo from './components/AdditionalInfo';
import ErrorPage from './components/ErrorPage';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import ClientLayout from "./layouts/ClientLayout";
import ClientDetailsPage from "./components/ClientDetailsPage";
import ClientFavoritesPage from "./components/ClientFavoritesPage";
import ClientHistoryPage from "./components/ClientHistoryPage";
import ClientDiscountsPage from "./components/ClientDiscountsPage";
import AuthProvider from 'react-auth-kit';
import createStore from "react-auth-kit/createStore";
import SpecialistsSearchPage from './components/SpecialistsSearchPage';

const store = createStore({
  authName: '_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

const App = () => {
  return (
      <AuthProvider store={store}>
    <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path={""} element={<HomePage />} /> {}
            <Route path="serviceCatalog" element={<ServiceCatalog />} />
            <Route path="masters" element={<SpecialistsSearchPage />} />
            <Route path="statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
            <Route path="reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
            <Route path="questionsAnswers" element={<ProtectedRoute><QuestionsAnswers /></ProtectedRoute>} />
            <Route path="currentTopics" element={<ProtectedRoute><CurrentTopics /></ProtectedRoute>} />
            <Route path="additionalInfo" element={<ProtectedRoute><AdditionalInfo /></ProtectedRoute>} />
            <Route path="/account" element={<ClientLayout />}>
              <Route path="details" element={<ClientDetailsPage />} />
              <Route path="favorites" element={<ClientFavoritesPage />} />
              <Route path="history" element={<ClientHistoryPage />} />
              <Route path="discounts" element={<ClientDiscountsPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/login" element={<AuthPage />} />
        </Routes>
    </Router>
      </AuthProvider>
  );
};

export default App;
