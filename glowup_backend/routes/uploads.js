const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Конфигурация multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Путь, где будут сохраняться файлы
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  try {
    // Возвращаем путь к изображению для отображения на клиенте
    res.status(200).json({ imagePath: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при загрузке файла' });
  }
});

module.exports = router;