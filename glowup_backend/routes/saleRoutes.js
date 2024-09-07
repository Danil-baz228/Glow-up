const express = require('express');
const { getAllSales } = require('../controllers/saleController');

const router = express.Router();

router.get('/', getAllSales);

module.exports = router;
