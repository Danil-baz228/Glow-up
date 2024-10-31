const Review = require('../models/Review');
const Client = require('../models/Client');

const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.findAll({
        include: [
          {
            model: Client, // Подключаем модель Client
            as: 'client',  // Это должно соответствовать alias из belongsTo
          }
        ]
      });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
        } else {
            await review.update(req.body);
            res.status(200).json(review);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
        } else {
            await review.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}