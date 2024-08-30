const Master = require('../models/Master');

const getAllMasters = async (req, res) => {
    try {
        const masters = await Master.findAll();
        res.status(200).json(masters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllMasters
}