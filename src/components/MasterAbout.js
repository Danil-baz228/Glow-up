import React, { useState } from 'react'; 
import styles from './css/MasterPage/MasterAbout.module.css'; // Стили
import post1 from "../assets/aboutphoto1.png";
import post12 from "../assets/aboutphoto1.2.png";
import pen from "../icons/free-icon-font-pencil-3917376.png";
import arrowDown from "../icons/free-icon-font-arrow-down-3916787.png";
import arrowUp from "../icons/free-icon-font-arrow-up-3916795.png";
import trash from "../icons/free-icon-font-trash-empty-16769010.png";
import post2 from "../assets/post2.png";
import post21 from "../assets/post21.png";
import post22 from "../assets/post22.png";
import post3 from "../assets/post3.png";
import TemplateModal from './MasterTemplateModal';

const About = () => {


    const [sections, setSections] = useState([
        {
            id: 1,
            title: "Hello! It is about me",
            description: "I’m Olga Tsyganenko, a dedicated and certified Esthetician...",
            images: [post1, post12],
        },
        {
            id: 2,
            title: "My Certifications and Professional Development",
            description: "I take immense pride in my commitment to continuous professional development...",
            images: [post2, post21, post22],
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
                    <div className={styles.EquipmentGallery}>
                        <img src={post3} alt="Equipment" onClick={() => openModal(post3)} />
                    </div>
                </>
            ),
            images: [post3],
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
            images: [],
        },
    ]);
    
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [imageLimits, setImageLimits] = useState({ first: 2, second: 3, third: 1 });
    const [selectedImages, setSelectedImages] = useState({ first: [], second: [], third: [] });

    const [isAddInfoModalOpen, setIsAddInfoModalOpen] = useState(false);
    const [newSection, setNewSection] = useState({ title: "", description: "", images: [] });

    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleImageChange = (e, idx) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCurrentSection((prev) => {
                    const updatedImages = [...prev.images];
                    updatedImages[idx] = reader.result;
                    return { ...prev, images: updatedImages };
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = (section, file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImages((prev) => {
                if (prev[section].length < imageLimits[section]) {
                    return {
                        ...prev,
                        [section]: [...prev[section], reader.result],
                    };
                } else {
                    alert(`You can only select up to ${imageLimits[section]} images for this section.`);
                    return prev;
                }
            });
        };
        reader.readAsDataURL(file);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsAddInfoModalOpen(false); // Правильное закрытие
    };

    const openEditModal = (section) => {
        setCurrentSection({ ...section });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentSection(null);
    };

    const handleSave = () => {
        setSections((prevSections) =>
            prevSections.map((sec) =>
                sec.id === currentSection.id ? { ...currentSection } : sec
            )
        );
        closeEditModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentSection((prev) => ({ ...prev, [name]: value }));
    };

    const moveUp = (index) => {
        if (index === 0) return;
        const newSections = [...sections];
        [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
        setSections(newSections);
    };

    const moveDown = (index) => {
        if (index === sections.length - 1) return;
        const newSections = [...sections];
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        setSections(newSections);
    };

    const deleteSection = (id) => {
        const newSections = sections.filter((section) => section.id !== id);
        setSections(newSections);
    };

    const handleOpenAddInfoModal = () => {
        setIsAddInfoModalOpen(true); // Правильное открытие
    };

    const handleCloseAddInfoModal = () => {
        setIsAddInfoModalOpen(false);
        setNewSection({ title: "", description: "", images: [] });
    };

    const handleAddInfoInputChange = (e) => {
        const { name, value } = e.target;
        setNewSection((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
        setNewSection((prev) => ({ ...prev, images: [...prev.images, ...fileArray] }));
    };

    const handleSaveNewSection = () => {
        setSections((prev) => [...prev, newSection]);
        handleCloseAddInfoModal();
    };
    return (
        <div className={styles.aboutContainer}>
            <button className={styles.addAboutBtn} onClick={handleOpenModal}>
                Add new information
            </button>

            {sections.map((section, index) => (
                <section key={section.id} className={styles.aboutSection}>
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                    <div className={styles.imageGallery}>
                        {section.images.map((image, idx) => (
                            <img key={idx} src={image} alt={`Section ${section.id} Image ${idx + 1}`} onClick={() => openModal(image)} />
                        ))}
                    </div>
                    <div className={styles.controls}>
                        <button onClick={() => openEditModal(section)}>
                            Edit Information <img src={pen} alt="edit icon" className={styles.icon} />
                        </button>
                        <button onClick={() => moveDown(index)}>Move down <img src={arrowDown} alt="down icon" className={styles.icon} /></button>
                        <button onClick={() => moveUp(index)}>Move up <img src={arrowUp} alt="up icon" className={styles.icon} /></button>
                        <button onClick={() => deleteSection(section.id)}>Delete <img src={trash} alt="delete icon" className={styles.icon} /></button>
                    </div>
                </section>
            ))}

       

            {isEditModalOpen && currentSection && (
                <div className={styles.modalOverlay} onClick={closeEditModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Information</h2>

                        <label>Headline:</label>
                        <input
                            type="text"
                            name="title"
                            value={currentSection.title || ''}
                            onChange={handleInputChange}
                        />

                        <label>Description:</label>
                        <textarea
                            type="text"
                            name="description"
                            value={currentSection.description || ''}
                            onChange={handleInputChange}
                        />

                        <label>Images:</label>
                        <div className={styles.imageGallery}>
                            {currentSection.images && currentSection.images.map((image, idx) => (
                                <div key={idx} className={styles.imageWrapper}>
                                    <img src={image} alt={`Edit Section Image ${idx + 1}`} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, idx)}
                                        className={styles.imageInput}
                                    />
                                </div> 
                            ))}
                        </div>
                  <button onClick={handleSave}>Save</button>
                    </div>
                    </div>
                    )} 
             {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Select a Template</h2>
                        <div className={styles.templateContainer}>
                            {/* First Component (2 images) */}
                            <div className={styles.templateSection}>
                                <h3>First Component (2 images)</h3>
                                {selectedImages.first.map((image, idx) => (
                                    <img key={idx} src={image} alt="Selected" />
                                ))}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSelectImage("first", e.target.files[0])}
                                />
                            </div>

                            {/* Second Component (3 images) */}
                            <div className={styles.templateSection}>
                                <h3>Second Component (3 images)</h3>
                                {selectedImages.second.map((image, idx) => (
                                    <img key={idx} src={image} alt="Selected" />
                                ))}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSelectImage("second", e.target.files[0])}
                                />
                            </div>

                            {/* Third Component (1 image) */}
                            <div className={styles.templateSection}>
                                <h3>Third Component (1 image)</h3>
                                {selectedImages.third.map((image, idx) => (
                                    <img key={idx} src={image} alt="Selected" />
                                ))}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSelectImage("third", e.target.files[0])}
                                />
                            </div>

                            {/* Contact Information */}
                            <div className={styles.contactInfo}>
                                <h3>Contact Information</h3>
                                <p>Your contact information will go here.</p>
                            </div>
                        </div>
                        <button className={styles.addAboutBtn} onClick={handleOpenAddInfoModal}>
    Add new information
</button>
                    </div>
                </div>
            )}

{isAddInfoModalOpen && (
    <div className={styles.modalOverlay} onClick={handleCloseAddInfoModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Add Information</h2>
                        
                        <label>Headline:</label>
                        <input
                            type="text"
                            name="title"
                            value={newSection.title}
                            onChange={handleAddInfoInputChange}
                        />
                        
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newSection.description}
                            onChange={handleAddInfoInputChange}
                        />
                        
                        <label>Images:</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                        />
                        
                        <div className={styles.imagePreview}>
                            {newSection.images.map((image, idx) => (
                                <img key={idx} src={image} alt={`Preview ${idx + 1}`} />
                            ))}
                        </div>
                        
                        <button onClick={handleSaveNewSection}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;