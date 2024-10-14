const express = require('express');
const { getAllCategories, createCategory, deleteCategory, getCategoryById, updateCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);

module.exports = router;