import React, { useState } from 'react';
import './css/MasterPage/MasterTemplateModal.css';
import gallery from "../icons/free-icon-font-add-image-13727345.png";
const TemplateModal = ({ isOpen, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    // Функция для выбора шаблона
    const selectTemplate = (template) => {
        setSelectedTemplate(template);
        setImages([]); // Сброс изображений при выборе нового шаблона
        setError('');  // Сброс ошибки при выборе нового шаблона
    };

    // Открытие файлового проводника
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        // Проверка количества выбранных файлов в зависимости от шаблона
        if (files.length !== selectedTemplate) {
            setError(`Please select exactly ${selectedTemplate} image(s).`);
            setImages([]);
        } else {
            setError('');
            setImages(files);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Select a template</h2>
            <div className="template-container">
                {/* Первая розовая рамка */}
                <div 
                    className={`template-frame pink ${selectedTemplate === 1 ? 'selected' : ''}`} 
                    onClick={() => setSelectedTemplate(1)}>
                    <div className="headline">Headline</div>
                    <div className="description">Description</div>
                   
                    <img src={gallery} alt="gallery" className="gallery" />
                    
                </div>
                    
                    {/* Шаблон с двумя картинками */}
                    <div 
                        className={`template-frame yellow ${selectedTemplate === 2 ? 'selected' : ''}`} 
                        onClick={() => setSelectedTemplate(2)}>
                        <div className="headline">Headline</div>
                        <div className="description">Description</div>
                        <img src={gallery} alt="gallery" className="gallery" /> 
                         <img src={gallery} alt="gallery" className="gallery" />
                    </div>

                    {/* Шаблон с тремя картинками */}
                    <div 
                        className={`template-frame blue ${selectedTemplate === 3 ? 'selected' : ''}`} 
                        onClick={() => setSelectedTemplate(3)}>
                        <div className="headline">Headline</div>
                        <div className="description">Description</div>
                        <img src={gallery} alt="gallery" className="gallery" />
                        <img src={gallery} alt="gallery" className="gallery" />
                        <img src={gallery} alt="gallery" className="gallery" />
                    </div>
                <div 
                        className={`template-frame black ${selectedTemplate === 4 ? 'selected' : ''}`} 
                        onClick={() => setSelectedTemplate(4)}>
                        <div className="contact-info">
                            <p>Contact Information</p>
                            <div className="social-icons">
                                <img src="instagram-icon.png" alt="Instagram" />
                                <img src="telegram-icon.png" alt="Telegram" />
                                <img src="whatsapp-icon.png" alt="WhatsApp" />
                            </div>
                        </div>
                    </div>
                
                {selectedTemplate && (
                    <div className="upload-section">
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleImageUpload} 
                            accept="image/*" 
                            // Ограничиваем максимальное количество файлов для выбора
                            onClick={(e) => e.target.value = null} // Очищаем значение input перед новым выбором
                        />
                        {error && <p className="error-message">{error}</p>}
                        {images.length > 0 && (
                            <div className="image-preview">
                                {images.map((image, index) => (
                                    <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div> </div>
    );
};

export default TemplateModal;
