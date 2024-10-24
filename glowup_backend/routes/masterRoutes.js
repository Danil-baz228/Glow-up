const express = require('express');
const sequelize = require('../config/db.config');
const { getAllMasters, createMaster, deleteMaster, getMasterById, updateMaster, uploadImages, handleImageUpload,
    addSalon,
    removeSalon,
    getMasterByUserId
} = require('../controllers/masterController');
const Master = require('../models/Master.js');
const Occupation = require('../models/Occupation.js');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
      const { term, categories, location } = req.query;

      // Build the where clause for the search
      const whereClause = {};

      if (term) {
          whereClause[Op.or] = [
              { first_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('first_name')), 'LIKE', `%${term.toLowerCase()}%`) },
              { last_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('last_name')), 'LIKE', `%${term.toLowerCase()}%`) }
          ];
      }

      const includeClause = {
          model: Occupation,
          attributes: ['name'],
      };

      if (categories && categories.trim()) {
          const categoryList = categories.split(',').filter(Boolean);
          if (categoryList.length > 0) {
              includeClause.where = { name: { [Op.in]: categoryList } };
          }
      }

      // Perform the search
      const masters = await Master.findAll({
          where: whereClause,
          include: [includeClause],
          attributes: ['master_id', 'first_name', 'last_name', 'avatar_url'],
      });

      res.json(masters);
  } catch (error) {
      console.error('Error searching masters:', error.message);
      res.status(500).json({ message: `An error occurred while searching for masters: ${error.message}` });
  }
});

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
router.get('/userId/:userId', getMasterByUserId);
router.put('/:id', updateMaster);
router.post('/:masterId/salon', addSalon);
router.delete('/:masterId/salon', removeSalon);

router.post('/:id/upload-images', uploadImages, handleImageUpload);

module.exports = router;
