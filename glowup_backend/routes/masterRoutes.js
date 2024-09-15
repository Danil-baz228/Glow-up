const express = require('express');
const { getAllMasters, createMaster, deleteMaster, getMasterById, updateMaster } = require('../controllers/masterController');

const router = express.Router();

router.get('/', getAllMasters);
router.post('/', createMaster);
router.delete('/:id', deleteMaster);
router.get('/:id', getMasterById);
router.put('/:id', updateMaster);

module.exports = router;
