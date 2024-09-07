const Service = require('../models/Service');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllServices
}