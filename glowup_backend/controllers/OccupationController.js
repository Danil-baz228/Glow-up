const Occupation = require('../models/Occupation');

const getAllOccupations = async (req, res) => {
    try {
        const occupations = await Occupation.findAll();
        res.status(200).json(occupations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOccupations
}