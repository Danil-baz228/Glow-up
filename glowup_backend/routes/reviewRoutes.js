const express = require('express');
const { getAllReviews, createReview, deleteReview, getReviewById, updateReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', createReview);

router.delete('/:id', deleteReview);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);

module.exports = router;
