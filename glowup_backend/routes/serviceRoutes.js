const express = require('express');
const { getAllServices, createService, deleteService, getServiceById, updateService } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getAllServices);
router.post('/', createService);
router.delete('/:id', deleteService);
router.get('/:id', getServiceById);
router.put('/:id', updateService);

module.exports = router;
