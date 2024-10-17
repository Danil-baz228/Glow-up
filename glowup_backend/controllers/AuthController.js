const {createUser} = require('./UserController');
const {createClient} = require('./ClientController');
const {createMaster} = require('./MasterController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await createUser({ body: { email, password: hashedPassword, role } });

        // Create a client or master based on role
        if (role === 'client') {
            await createClient({ body: {
                    email: newUser.email,
                    phone: req.body.phone,
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    date_of_birth: req.body.date_of_birth,
                    user_id: newUser.user_id,
                }});
        } else if (role === 'master') {
            await createMaster({ body: {
                    email: newUser.email,
                    phone: req.body.phone,
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    gender: "other",
                    date_of_birth: req.body.date_of_birth,
                    occupation_id: 1,
                    user_id: newUser.user_id,
                }});
        }

        // Send success response
        res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, // You can add any additional data here
            `${process.env.JWT_SECRET_KEY}`
        );

        res.status(200).json({
            token: token,
            id: user.user_id,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
}