const {Post} = require('../models/Relations');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            await post.update(req.body);
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            await post.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};