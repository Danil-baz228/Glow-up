const express = require('express');
const { getAllSalons, createSalon, deleteSalon, getSalonById, updateSalon, getSalonByMasterId } = require('../controllers/salonController');

const router = express.Router();

router.get('/', getAllSalons);
router.post('/', createSalon);
router.delete('/:id', deleteSalon);
router.get('/:id', getSalonById);
router.put('/:id', updateSalon);
router.get('/master/:id', getSalonByMasterId);

module.exports = router;
