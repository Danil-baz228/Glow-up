const Salon = require('../models/Salon');

const getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.findAll();
        res.status(200).json(salons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSalons
}