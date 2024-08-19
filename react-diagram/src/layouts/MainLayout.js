import React from 'react';
import { Outlet, Link } from 'react-routes-dom';

const MainLayout = () => {
  return (
    <div>
      <header>
        <h1>Beauty Salon</h1>
        <nav>
          <ul>
            <li><Link to="/">Main Page</Link></li>
            <li><Link to="/serviceCatalog">Service Catalog</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/questionsAnswers">Questions & Answers</Link></li>
            <li><Link to="/currentTopics">Current Topics</Link></li>
            <li><Link to="/additionalInfo">Additional Info</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Здесь будут отображаться вложенные маршруты */}
      </main>
      <footer>
        <p>Footer content</p>
      </footer>
    </div>
  );
};

export default MainLayout;
