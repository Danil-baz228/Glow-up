const express = require('express');
const { getAllCities, createCity, deleteCity, updateCity, getCityById } = require('../controllers/cityController');

const router = express.Router();

router.get('/', getAllCities);
router.post('/', createCity);
router.delete('/:id', deleteCity);
router.get('/:id', getCityById);
router.put('/:id', updateCity);

module.exports = router;
