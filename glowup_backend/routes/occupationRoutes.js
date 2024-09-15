const express = require('express');
const { getAllOccupations, createOccupation, deleteOccupation, getOccupationById, updateOccupation } = require('../controllers/occupationController');

const router = express.Router();

router.get('/', getAllOccupations);
router.post('/', createOccupation);
router.delete('/:id', deleteOccupation);
router.get('/:id', getOccupationById);
router.put('/:id', updateOccupation);

module.exports = router;
