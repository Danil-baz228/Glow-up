const {createUser} = require('./UserController');
const {createClient} = require('./ClientController');
const {createMaster} = require('./MasterController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        const user = await User.findOne({ where: { email } });
        if(user){
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({ body: { email, password: hashedPassword, role } }, res);
        if(role === 'client'){
            await createClient({ body: {
                email: newUser.email,
                userId: newUser.id,
                firstName: req.body.firstName,

            } }, res);
        } else if(role === 'master'){
            await createMaster({ body: { email: newUser.email, userId: newUser.id } }, res);
        }

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login
}