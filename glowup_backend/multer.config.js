// multer.config.js
const multer = require('multer');
const path = require('path');

// Настройка хранения файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/avatars'); // Папка для сохранения аватаров
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
    },
});

// Экспортируем настройку multer
const upload = multer({ storage: storage });

module.exports = upload;
