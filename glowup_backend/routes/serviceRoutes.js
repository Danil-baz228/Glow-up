const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { Op } = require('sequelize');
const {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    searchServices
} = require('../controllers/ServiceController');

// Маршрут для поиска услуг
router.get('/master/:masterId', async (req, res) => {
  const masterId = req.params.masterId; // Get master_id from the URL

  try {
    const services = await Service.findAll({
      where: { master_id: masterId }, // Filter services by master_id
      attributes: [
        'service_id',
        'title',
        'description',
        'benefits',
        'contraindications',
        'price',
        'image_url'
      ]
    });

    res.json(services);
  } catch (error) {
    console.error('Error fetching services for master:', error);
    res.status(500).json({ message: 'An error occurred while fetching services' });
  }
});

// Остальные маршруты
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;