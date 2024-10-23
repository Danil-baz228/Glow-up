import React, { useState } from 'react'; 
import './css/MasterPage/MasterAbout.css'; // Стили
import post1 from "../../../../../tempFile/assets/aboutphoto1.png";
import post12 from "../../../../../tempFile/assets/aboutphoto1.2.png";
import pen from "../../../../../tempFile/icons/free-icon-font-pencil-3917376.png";
import arrowDown from "../../../../../tempFile/icons/free-icon-font-arrow-down-3916787.png";
import arrowUp from "../../../../../tempFile/icons/free-icon-font-arrow-up-3916795.png";
import trash from "../../../../../tempFile/icons/free-icon-font-trash-empty-16769010.png";
import post2 from "../../../../../tempFile/assets/post2.png";
import post21 from "../../../../../tempFile/assets/post21.png";
import post22 from "../../../../../tempFile/assets/post22.png";
import post3 from "../../../../../tempFile/assets/post3.png";
import TemplateModal from './TemplateModal';

const About = () => {
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    // Открытие и закрытие модального окна
    const openTemplateModal = () => {
        setIsTemplateModalOpen(true);
    };

    const closeTemplateModal = () => {
        setIsTemplateModalOpen(false);
    };

    const [sections, setSections] = useState([
        {
            id: 1,
            title: "Hello! It is about me",
            content: (
                <>
                    <p>I’m Olga Tsyganenko, a dedicated and certified Esthetician with over 10 years in the industry.
                         My passion is helping people look and feel their best by offering exceptional beauty services tailored to their individual needs. 
                        I believe that beauty is more than skin deep; it's about confidence, comfort, and self-expression</p>
                    <div className="image-gallery">
                        <img src={post1} alt="Profile" onClick={() => openModal(post1)} />
                        <img src={post12} alt="Profile Close-up" onClick={() => openModal(post12)} />
                    </div>
                </>
            ),
        },
        {
            id: 2,
            title: "My Certifications and Professional Development",
            content: (
                <>
                    <p>I take immense pride in my commitment to continuous professional development. In an industry that is constantly evolving, I believe that staying updated with the latest trends, techniques, and technologies is essential to providing top-notch services to my clients. I am dedicated to refining my craft and enhancing my skills through regular training, workshops, and certifications. This dedication ensures that I remain at the forefront of the beauty industry, offering services that are not only current but also innovative and effective. I actively seek out opportunities to learn from the best in the field, participating in specialized courses and advanced workshops led by industry leaders</p>
                    <div className="certifications-gallery">
                        <img src={post2} alt="Certificate 1" onClick={() => openModal(post2)} />
                        <img src={post21} alt="Certificate 2" onClick={() => openModal(post21)} />
                        <img src={post22} alt="Certificate 3" onClick={() => openModal(post22)} />
                    </div>
                </>
            ),
        },
        {
            id: 3,
            title: "My Equipment and Products",
            content: (
                <>
                    <ul>
                        <p>To ensure the highest level of comfort, safety, and satisfaction, I use only the best equipment and products available:</p>
                        <li><strong>State-of-the-Art Equipment: I invest in the latest beauty technology, including precision waxing kits, high-performance nail tools, and skincare devices. This not only enhances the quality of the results but also reduces discomfort and procedure time.</strong>...</li>
                        <li><strong>Premium Quality Products: I carefully select each product I use, from hypoallergenic waxes to eco-friendly skincare lines. All products are chosen to suit a variety of skin types and sensitivities, ensuring everyone has a safe and pleasant experience.</strong>...</li>
                        <li><strong>Advanced Sterilization Techniques: Hygiene is my top priority. I adhere to medical-grade sterilization practices, ensuring all tools are disinfected and sanitized thoroughly after every use.</strong>...</li>
                    </ul>
                    <div className="equipment-gallery">
                        <img src={post3} alt="Equipment" onClick={() => openModal(post3)} />
                    </div>
                </>
            ),
        },
        {
            id: 4,
            title: "Contact Information",
            content: (
                <>
                    <p>Reach me on social media or by phone:</p>
                    <ul>
                        <li><strong>Instagram:</strong> beauty_freya</li>
                        <li><strong>Phone:</strong> 347-981-4831</li>
                        <li><strong>Email:</strong> freya.beauty.nyc@gmail.com</li>
                    </ul>
                </>
            ),
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
    const [modalImage, setModalImage] = useState(''); // Состояние для пути изображения

    // Открытие модального окна
    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage('');
    };

    // Переместить секцию вверх
    const moveUp = (index) => {
        if (index === 0) return; // Если элемент на самом верху
        const newSections = [...sections];
        [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]; // Меняем местами элементы
        setSections(newSections);
    };

    // Переместить секцию вниз
    const moveDown = (index) => {
        if (index === sections.length - 1) return; // Если элемент внизу
        const newSections = [...sections];
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]; // Меняем местами элементы
        setSections(newSections);
    };

    // Удалить секцию
    const deleteSection = (id) => {
        const newSections = sections.filter((section) => section.id !== id);
        setSections(newSections);
    };

    return (
        <div className="about-container">
            {/* Добавление кнопки Add New Information */}
            <button className="add-about-btn" onClick={openTemplateModal}>
                Add new information
            </button>

            {/* Модальное окно для добавления новой информации */}
            <TemplateModal isOpen={isTemplateModalOpen} onClose={closeTemplateModal} />

            {sections.map((section, index) => (
                <section key={section.id} className="about-section">
                    <h2>{section.title}</h2>
                    {section.content}
                    <div className="controls">
                        <button>Edit Information<img src={pen} alt="edit icon" className="icon" /></button>
                        <button onClick={() => moveDown(index)}>Move down <img src={arrowDown} alt="down icon" className="icon" /></button>
                        <button onClick={() => moveUp(index)}>Move up <img src={arrowUp} alt="up icon" className="icon" /></button>
                        <button onClick={() => deleteSection(section.id)}>Delete <img src={trash} alt="delete icon" className="icon" /></button>
                    </div>
                </section>
            ))}

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <img src={modalImage} alt="Modal" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
