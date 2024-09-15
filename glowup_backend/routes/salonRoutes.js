const express = require('express');
const { getAllSalons, createSalon, deleteSalon, getSalonById, updateSalon } = require('../controllers/salonController');

const router = express.Router();

router.get('/', getAllSalons);
router.post('/', createSalon);
router.delete('/:id', deleteSalon);
router.get('/:id', getSalonById);
router.put('/:id', updateSalon);

module.exports = router;
