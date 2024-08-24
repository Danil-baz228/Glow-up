import React from 'react';
import './css/HomePage/HomePage.css';
import phMaster from './img/master.jpg'; 
import './css/HomePage/Reviews.css';
const HomePage = () => {
  const reviews = [
    {
      name: 'Name 1',
      review: 'Lorem ipsum dolor sit amet consectetur. Suspendisse sollicitudin vulputate in elit tellus. Turpis amet ultrices amet scelerisque etiam. Tristique nibh a auctor odio. Eu et in in convallis felis eget nam suspendisse sem.',
      rating: 5
    },
    {
      name: 'Name 2',
      review: 'Lorem ipsum dolor sit amet consectetur. Suspendisse sollicitudin vulputate in elit tellus. Turpis amet ultrices amet scelerisque etiam. Tristique nibh a auctor odio. Eu et in in convallis felis eget nam suspendisse sem.',
      rating: 5
    },
    {
      name: 'Name 3',
      review: 'Lorem ipsum dolor sit amet consectetur. Suspendisse sollicitudin vulputate in elit tellus. Turpis amet ultrices amet scelerisque etiam. Tristique nibh a auctor odio. Eu et in in convallis felis eget nam suspendisse sem.',
      rating: 5
    }
  ];
  return (
    <div className="homepage">
      
        <div className="logo">Glow up</div>
        <h1>Знайдіть свого майстра, який вас зрозуміє</h1>
        <div className="button-group">
          <button className="primary-button">Підібрати майстра</button>
          <button className="secondary-button">Усі майстри</button>
        </div>
      

      <section className="info-section">
        <div className="info-card">
          <h2>Для всіх клієнтів</h2>
          <p>Ми допоможемо клієнтам знайти свого ідеального майстра та втілити в життя свої мрії.</p>
          <a href="#client" className="info-link">Веб-кабінет для клієнтів</a>
        </div>
        <div className="info-card">
          <h2>Для майстрів</h2>
          <p>Ми відкриваємо нові горизонти розвитку та кар'єрного росту, спрощуючи процес пошуку клієнтів.</p>
          <a href="#master" className="info-link">Веб-кабінет для майстрів</a>
        </div>
      </section>

      <section className="selection-section">
        <h2>Обери свої бажання</h2>
        <div className="selection-grid">
          <div className="selection-item">Text, text, text</div>
          <div className="selection-item">Text, text, text</div>
          <div className="selection-item">Text, text, text</div>
        </div>
        <div className="selection-grid">
          <div className="selection-item">Text, text, text</div>
          <div className="selection-item">Text, text, text</div>
          <div className="selection-item">Text, text, text</div>
        </div>
        <div className="selection-grid">
          <div className="selection-item">Text, text, text</div>
          <div className="selection-item">Text, text, text</div>
          <div className="selection-item">Text, text, text</div>
        </div>
      </section>
      <div className="main-page">
      <section className="selection-section">
        <h2>Тільки 5% майстрів проходять відбір</h2>
        <p>Ми ретельно перевіряємо майстрів, аби з вами працювали тільки професіонали</p>
        <div className="criteria">
          <div className="criteria-item">
            <input type="checkbox" checked readOnly />
            <label>Освіта та досвід</label>
          </div>
          <div className="criteria-item">
            <input type="checkbox" checked readOnly />
            <label>Співбесіда</label>
          </div>
          <div className="criteria-item">
            <input type="checkbox" checked readOnly />
            <label>Підвищення кваліфікації</label>
          </div>
        </div>
        <div className="master-photos">
          <img src={phMaster} alt="Master 1" />
          <img src={phMaster} alt="Master 2" />
          <img src={phMaster} alt="Master 3" />
          <img src={phMaster} alt="Master 4" />
          <img src={phMaster} alt="Master 5" />
          <div className="more-masters">50+</div>
        </div>
        <button className="select-master-btn">Підбрати майстра</button>
      </section>
      
      <section className="how-it-works">
        <h2>Як працює BEAUTY UNITE</h2>
        <ol>
          <li>
            <div className="step">
              <div className="step-number">1</div>
              <p>Обері майстра</p>
              <span>Пройди персоналізовану анкету або обирай з каталогу</span>
            </div>
          </li>
          <li>
            <div className="step">
              <div className="step-number">2</div>
              <p>Продовжи анкету</p>
              <span>Освіта, кваліфікація, ліцензія, а також портфоліо та відгуки</span>
            </div>
          </li>
          <li>
            <div className="step">
              <div className="step-number">3</div>
              <p>Познайомся та задай запитання</p>
              <span>Отримай консультацію у майстра у зручному для себе месенджері.</span>
            </div>
          </li>
          <li>
            <div className="step">
              <div className="step-number">4</div>
              <p>Отримай термін</p>
              <span>Узгодь час та місце зустрічі.</span>
            </div>
          </li>
        </ol>
      </section>
        <section className="reviews-section">
        <h2>Відгуки</h2>
        <div className="reviews-carousel">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-avatar"></div>
              <h3>{review.name}</h3>
              <div className="review-rating">
                {'★'.repeat(review.rating)}
              </div>
              <p>{review.review}</p>
              <a href="#">читати більше</a>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="arrow">→</div>
        </div>
      </section>
    </div>
    </div>
    
  );
};

export default HomePage;
