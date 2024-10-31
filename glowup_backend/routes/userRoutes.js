const express = require('express');
const { getAllUsers, createUser, getUserById, deleteUser, updateUser, uploadAvatar } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/avatars');
    },
    filename: function (req, file, cb) {
        const userId = req.params.id;
        const fileExtension = path.extname(file.originalname);
        cb(null, `${userId}-avatar${fileExtension}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats allowed!'));
        }
    }
});

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Обработка загрузки аватара с обработкой ошибок
router.post('/upload-avatar/:id', (req, res, next) => {
    upload.single('avatar')(req, res, (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        next();
    });
}, uploadAvatar);

module.exports = router;
