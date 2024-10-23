import React, { useState } from 'react';
import './css/Blog.css';

// Импортируем все необходимые изображения
import faceCareImg from './img/Blogimg/1.png';
import peachFuzzImg from './img/Blogimg/2.png';
import everydayImagesImg from './img/Blogimg/3.png';
import hairstylesImg from './img/Blogimg/4.png';
import makeupImg from './img/Blogimg/5.png';
import oscarsImg from './img/Blogimg/6.png';
import trendsImg from './img/Blogimg/7.png';
import Modal from './ModalBlog';

const BlogPage = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const articles = [
        {
            title: 'Face Care',
            subtitle: 'CHOOSE YOUR CARE',
            image: faceCareImg,
            description: 'Do you need special face care? Here are your daily steps for smooth, fresh skin...',
            fullDescription: 'To keep your skin looking radiant and healthy, it is important to maintain a consistent skincare routine. Face care routines typically include cleansing, toning, moisturizing, and exfoliating. Additionally, incorporating serums and sun protection can help target specific skin concerns. Ultrasound facial treatments are also gaining popularity for their non-invasive benefits, promoting collagen production and reducing the appearance of fine lines and wrinkles.'
        },
        {
            title: 'Peach Fuzz – Color of 2024',
            subtitle: 'COLOR OF 2024',
            image: peachFuzzImg,
            description: 'The hit color of 2024 according to stylists is Peach Fuzz, a trendy warm color...',
            fullDescription: 'Peach Fuzz has been chosen as the color of 2024 due to its warmth, softness, and versatility. Fashion and interior design trends are incorporating this color in various ways, from subtle accents to bold statements. This color pairs well with neutral tones and can be used to add a fresh and vibrant look to any outfit or space. The key is to blend it with other warm tones for a cohesive and modern appearance.'
        },
        {
            title: 'Variety Everyday Images',
            subtitle: 'EVERYDAY IMAGES',
            image: everydayImagesImg,
            description: 'Images of original hairstyles and everyday fashion trends that will inspire...',
            fullDescription: 'Everyday fashion is evolving to prioritize comfort and individuality. From unique hair accessories to practical yet stylish clothing, people are exploring ways to express themselves while staying comfortable in their daily lives. Streetwear trends are merging with high fashion, creating an interesting blend of casual yet chic styles. The focus is on simplicity, with neutral colors and clean lines dominating everyday wardrobes.'
        },
        {
            title: 'Beauty Trends: Haircuts and Hairstyles',
            subtitle: 'HIT OF AUTUMN 2024: TOP HAIRSTYLES',
            image: hairstylesImg,
            description: 'Get creative with haircuts and hairstyles for this autumn, as suggested by top stylists...',
            fullDescription: 'Autumn 2024 is all about experimenting with volume and layers in haircuts. Stylists recommend haircuts that add movement and texture, such as shaggy cuts, layered bobs, and curtain bangs. Hairstyles like sleek ponytails and voluminous waves are also trending, giving people the option to choose between a polished or casual look. Hair colors this season include warm caramel tones and rich, deep browns.'
        },
        {
            title: 'Makeup Trends for Autumn',
            subtitle: 'SEE YOU IN AUTUMN',
            image: makeupImg,
            description: 'Highlight your beauty with fresh and elegant makeup trends this season...',
            fullDescription: 'The makeup trends for autumn 2024 emphasize natural beauty with a touch of boldness. Think of soft, dewy skin paired with a statement lip or dramatic eye. Neutral tones are being used for the base, while pops of color are being applied to the eyes or lips to make the look stand out. Another trend this season is minimalist makeup that focuses on enhancing natural features with subtle highlights and bronzers.'
        },
        {
            title: 'Oscars 2024: The 10 Best Dressed',
            subtitle: "OSCARS' 2024: THE MOST STYLISH IMAGES",
            image: oscarsImg,
            description: 'A round-up of the best looks at the Oscars 2024 red carpet, featuring timeless elegance...',
            fullDescription: 'The Oscars 2024 red carpet was filled with glamorous and elegant outfits that showcased high fashion. From timeless black gowns to sparkling metallic dresses, celebrities made bold fashion statements while keeping it sophisticated. Some notable trends included vintage-inspired looks, such as 1920s glamour and 1980s power suits, as well as modern minimalist designs with clean lines and structured silhouettes.'
        },
        {
            title: 'Main Trends in Makeup 2024',
            subtitle: 'FASHIONABLE MAKE-UP THIS YEAR',
            image: trendsImg,
            description: 'The main beauty trends for 2024: new ideas and tips from top professionals...',
            fullDescription: 'Makeup trends in 2024 are pushing the boundaries of creativity. Bold, graphic eyeliner designs and vibrant eyeshadow colors are taking center stage. At the same time, the concept of “no-makeup” makeup remains popular, focusing on glowing, natural-looking skin with minimal coverage. The beauty industry is also seeing a rise in sustainable and eco-friendly products, with more consumers opting for vegan and cruelty-free options.'
        },
    ];

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="blog-page">
            <h2 className="blog-header">Blog</h2>
            <div className="blog-articles">
                {articles.map((article, index) => (
                    <div key={index} className={`blog-card blog-card-${index + 1}`}>
                        <img src={article.image} alt={article.title} />
                        <div className="blog-content">
                            <h4 className="article-subtitle">{article.subtitle}</h4>
                            <h3 className="article-title">{article.title}</h3>
                            <p>{article.description}</p>
                            <button className="button-no-background" onClick={() => handleReadMore(article)}>Read More ⮕</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedArticle && (
                <Modal
                    title={selectedArticle.title}
                    image={selectedArticle.image}
                    description={selectedArticle.fullDescription}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default BlogPage;
