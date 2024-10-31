const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Хеширование пароля перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, role });

        // Возвращаем созданного пользователя
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user: ' + error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users: ' + error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        // Проверка, найден ли пользователь
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user: ' + error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, role } = req.body;
        const user = await User.findByPk(id);

        // Проверка, найден ли пользователь
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Обновление данных пользователя
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (role) user.role = role;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user: ' + error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        // Проверка, найден ли пользователь
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user: ' + error.message });
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const avatarUrl = `/images/avatars/${req.file.filename}`;
        await user.update({ avatar_url: avatarUrl });

        res.status(200).json({ message: 'Avatar uploaded successfully', avatar_url: avatarUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    uploadAvatar
}
