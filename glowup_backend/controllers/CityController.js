const City = require('../models/City');

const getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCities
}