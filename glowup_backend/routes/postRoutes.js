const express = require('express');
const { getAllPosts, createPost, deletePost, getPostById, updatePost } = require('../controllers/PostController');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);

module.exports = router;