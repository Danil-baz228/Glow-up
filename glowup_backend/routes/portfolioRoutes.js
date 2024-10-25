const express = require('express');
const router = express.Router();
const { getPortfolioByMasterId, createPortfolio } = require('../controllers/PortfolioController');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/portfolios');
    },
    filename: function (req, file, cb) {
        const { headline } = req.body;
        const fileExtension = path.extname(file.originalname);
        cb(null, `${headline}-portfolio${fileExtension}`);
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

router.get('/master/:master_id', getPortfolioByMasterId);
router.post('/', upload.single('image'), createPortfolio);

module.exports = router;