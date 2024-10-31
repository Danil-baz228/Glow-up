const {createUser} = require('./UserController');
const {createClient} = require('./ClientController');
const {createMaster} = require('./MasterController');
const {User, Client, Master} = require('../models/Relations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "shumejko.sasha@gmail.com",
            pass: 'vtsywmesziqxxnda'
        }
    });

    const mailOptions = {
        from: "shumejko.sasha@gmail.com",
        to: email,
        subject: 'GlowUp verification code',
        text: `Your verification code is: ${code}`
    };

    await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "shumejko.sasha@gmail.com",
            pass: 'vtsywmesziqxxnda'
        }
    });

    const mailOptions = {
        from: "shumejko.sasha@gmail.com",
        to: email,
        subject: 'GlowUp new password',
        text: `Your new password is: ${password}. Please change it after logging in.`
    };

    await transporter.sendMail(mailOptions);
}

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;


        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const newUser = {
            email,
            password: hashedPassword,
            role,
            verificationCode
        };

        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let username = null;

        if(user.role === 'client') {
            const client = await Client.findOne({ where: { user_id: user.user_id } });
            username = `${client.last_name} ${client.first_name}`;
        } else if(user.role === 'master') {
            const master = await Master.findOne({ where: { user_id: user.user_id } });
            username = `${master.last_name} ${master.first_name}`;
        }


        // Check if password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const tokenExpiration = rememberMe ? (60 * 60 * 24 * 7) : (60 * 60);

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + tokenExpiration }, // You can add any additional data here
            `${process.env.JWT_SECRET_KEY}`
        );

        res.status(200).json({
            token: token,
            id: user.user_id,
            email: user.email,
            role: user.role,
            username: username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({ body: { email, password: hashedPassword, role } });

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

        res.status(200).json({ message: 'Email verified successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000);

        await sendVerificationEmail(email, resetCode);

        res.status(200).json({message: 'Password reset code sent successfully', resetCode});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const resetPassword = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const tempPassword = Math.random().toString(36).slice(-8);

        user.password = await bcrypt.hash(tempPassword, 10);

        await sendPasswordResetEmail(email, tempPassword);

        await user.save();

        res.status(200).json({message: 'Password reset successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    register,
    login,
    verifyEmail,
    requestPasswordReset,
    resetPassword
};