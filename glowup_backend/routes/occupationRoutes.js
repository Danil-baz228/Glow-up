const express = require('express');
const { getAllOccupations } = require('../controllers/occupationController');

const router = express.Router();

router.get('/', getAllOccupations);

module.exports = router;
