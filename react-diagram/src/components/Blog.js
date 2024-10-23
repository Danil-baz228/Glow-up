import React from 'react';
import './css/Blog.css';

// Импортируем все необходимые изображения
import faceCareImg from './img/Blogimg/1.png';
import peachFuzzImg from './img/Blogimg/2.png';
import everydayImagesImg from './img/Blogimg/1.png';
import hairstylesImg from './img/Blogimg/1.png';
import makeupImg from './img/Blogimg/1.png';
import oscarsImg from './img/Blogimg/1.png';
import trendsImg from './img/Blogimg/1.png';

const BlogPage = () => {
    const articles = [
        {
            title: 'Face Care',
            subtitle: 'Step by step instructions',
            image: faceCareImg,
            link: '#',
            description: 'Do you need special face care? Here are your daily steps for smooth, fresh skin...',
        },
        {
            title: 'Peach Fuzz – Color of 2024',
            subtitle: 'by Patrick Vesson',
            image: peachFuzzImg,
            link: '#',
            description: 'The hit color of 2024 according to stylists is Peach Fuzz, a trendy warm color...',
        },
        {
            title: 'Variety Everyday Images',
            subtitle: '',
            image: everydayImagesImg,
            link: '#',
            description: 'Images of original hairstyles and everyday fashion trends that will inspire...',
        },
        {
            title: 'Beauty Trends: Haircuts and Hairstyles',
            subtitle: 'Hit of Autumn 2024',
            image: hairstylesImg,
            link: '#',
            description: 'Get creative with haircuts and hairstyles for this autumn, as suggested by top stylists...',
        },
        {
            title: 'Makeup Trends for Autumn',
            subtitle: 'See You in Autumn',
            image: makeupImg,
            link: '#',
            description: 'Highlight your beauty with fresh and elegant makeup trends this season...',
        },
        {
            title: 'Oscars 2024: The 10 Best Dressed',
            subtitle: '',
            image: oscarsImg,
            link: '#',
            description: 'A round-up of the best looks at the Oscars 2024 red carpet, featuring timeless elegance...',
        },
        {
            title: 'Main Trends in Makeup 2024',
            subtitle: '',
            image: trendsImg,
            link: '#',
            description: 'The main beauty trends for 2024: new ideas and tips from top professionals...',
        },
    ];

    return (
        <div className="blog-page">
            <h2 className="blog-header">Blog</h2>
            <div className="blog-articles">
                {articles.map((article, index) => (
                    <div key={index} className={`blog-card blog-card-${index + 1}`}>
                        <img src={article.image} alt={article.title} />
                        <div className="blog-content">
                            <h3>{article.title}</h3>
                            <h4>{article.subtitle}</h4>
                            <p>{article.description}</p>
                            <a href={article.link}>Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default BlogPage;
