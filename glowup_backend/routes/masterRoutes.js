const express = require('express');
const { getAllMasters, createMaster, deleteMaster, getMasterById, updateMaster, uploadImages, handleImageUpload,
    addSalon,
    removeSalon
} = require('../controllers/masterController');
const Master = require('../models/Master.js');
const sequelize = require('../config/db.config.js')

const router = express.Router();

// Get 5 random masters to show on a main page in the "Specialists" block
router.get('/random/5', async (req, res) => {
  try {
      const totalMasters = await Master.count();
      console.log('Total masters count:', totalMasters);

      if (totalMasters === 0) {
          return res.status(404).json({ message: 'No masters found' });
      }

      const masters = await Master.findAll({
          order: sequelize.random(),
          limit: 5,
      });
      
      console.log('Fetched masters:', masters);
      res.json({ masters, totalMasters });
  } catch (error) {
      console.error('Error fetching random masters:', error); 
      res.status(500).json({ message: error.message });
  }
});

router.get('/', getAllMasters);
router.post('/', createMaster);
router.delete('/:id', deleteMaster);
router.get('/:id', getMasterById);
router.put('/:id', updateMaster);
router.post('/:masterId/salon', addSalon);
router.delete('/:masterId/salon', removeSalon);

router.post('/:id/upload-images', uploadImages, handleImageUpload);

module.exports = router;
