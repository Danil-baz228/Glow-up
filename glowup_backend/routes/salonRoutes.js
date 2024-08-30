const express = require('express');
const { getAllSalons } = require('../controllers/salonController');

const router = express.Router();

router.get('/', getAllSalons);

module.exports = router;
