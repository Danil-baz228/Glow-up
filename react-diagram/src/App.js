import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './components/HomePage';
import ServiceCatalog from './components/ServiceCatalog';
import Statistics from './components/Statistics';
import Reviews from './components/Reviews';
import QuestionsAnswers from './components/QuestionsAnswers';
import AboutUs from './components/AboutUs';
import AdditionalInfo from './components/AdditionalInfo';
import ErrorPage from './components/ErrorPage';
import AuthPage from './components/AuthPage';
import {LanguageProvider} from './components/LanguageContext';
import ClientLayout from "./layouts/ClientLayout";
import ClientDetailsPage from "./components/ClientDetailsPage";
import ClientFavoritesPage from "./components/ClientFavoritesPage";
import ClientHistoryPage from "./components/ClientHistoryPage";
import ClientDiscountsPage from "./components/ClientDiscountsPage";
import AuthProvider from 'react-auth-kit';
import createStore from "react-auth-kit/createStore";
import SpecialistsSearchPage from './components/SpecialistsSearchPage';
import MasterLocationPage from "./components/MasterLocationPage";
import MasterServicePage from './components/MasterServicePage';
import MasterPortfolioPage from './components/MasterPortfolioPage';
import MasterReviewsPage from './components/MasterReviewsPage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MasterLayout from "./layouts/MasterLayout";
import Blog from "./components/Blog";

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false
});





// Компонент для прокрутки на верх
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!pathname.startsWith('/master') && !pathname.startsWith('/account')) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};

const App = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const toggleAuthModal = () => {
        setIsAuthModalOpen(!isAuthModalOpen);
    };

    return (
        <AuthProvider store={store}>
            <Router>
                <LanguageProvider>
                    <ScrollToTop/>
                    <Routes>
                        <Route path="/" element={<MainLayout isAuthModalOpen={isAuthModalOpen}
                                                             setIsAuthModalOpen={setIsAuthModalOpen}
                                                             toggleAuthModal={toggleAuthModal}/>}>
                            <Route path={""} element={<HomePage toggleAuthModal={toggleAuthModal}/>}/> {}
                            <Route path="serviceCatalog" element={<ServiceCatalog/>}/>
                            <Route path="masters" element={<SpecialistsSearchPage/>}/>
                            <Route path="statistics" element={<Statistics/>}/>
                            <Route path="reviews" element={<Reviews/>}/>
                            <Route path="questionsAnswers" element={<QuestionsAnswers/>}/>
                            <Route path="currentTopics" element={<AboutUs/>}/>
                            <Route path="additionalInfo" element={<AdditionalInfo/>}/>
                            <Route path="/account" element={<ClientLayout toggleAuthModal={toggleAuthModal}/>}>
                                <Route path="details" element={<ClientDetailsPage/>}/>
                                <Route path="favorites" element={<ClientFavoritesPage/>}/>
                                <Route path="history" element={<ClientHistoryPage/>}/>
                                <Route path="discounts" element={<ClientDiscountsPage/>}/>
                            </Route>
                            <Route path="/master" element={<MasterLayout/>}>
                                <Route path="portfolio" element={<MasterPortfolioPage/>}/>
                                <Route path="services" element={<MasterServicePage/>}/>
                                <Route path="location" element={<MasterLocationPage/>}/>
                                <Route path="reviews" element={<MasterReviewsPage/>}/>
                            </Route>
                            <Route path="blog" element={<Blog/>}/>
                            <Route path="*" element={<ErrorPage/>}/>
                        </Route>
                        <Route path="/login" element={<AuthPage/>}/>
                        <Route path="/dev" element={<MasterLocationPage/>}/>
                    </Routes>
                </LanguageProvider>
            </Router>
        </AuthProvider>
    );
};

export default App;
