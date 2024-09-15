const express = require('express');
const { getAllSales, createSale, deleteSale, getSaleById, updateSale } = require('../controllers/saleController');

const router = express.Router();

router.get('/', getAllSales);
router.post('/', createSale);
router.delete('/:id', deleteSale);
router.get('/:id', getSaleById);
router.put('/:id', updateSale);

module.exports = router;
