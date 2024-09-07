const User = require('../models/User');

const createUser = async (req, res) => { // TODO: secure password hashing
    try {
        const { email, password, role } = req.body;
        const newUser = await User.create({ email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers
}