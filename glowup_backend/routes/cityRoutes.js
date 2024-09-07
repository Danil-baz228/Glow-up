const express = require('express');
const { getAllCities } = require('../controllers/cityController');

const router = express.Router();

router.get('/', getAllCities);

module.exports = router;
