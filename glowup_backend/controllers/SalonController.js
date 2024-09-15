const Salon = require('../models/Salon');

const getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.findAll();
        res.status(200).json(salons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSalonById = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) {
            res.status(404).json({ message: 'Salon not found' });
        } else {
            res.status(200).json(salon);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createSalon = async (req, res) => {
    try {
        const salon = await Salon.create(req.body);
        res.status(201).json(salon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSalon = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) {
            res.status(404).json({ message: 'Salon not found' });
        } else {
            await salon.update(req.body);
            res.status(200).json(salon);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteSalon = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) {
            res.status(404).json({ message: 'Salon not found' });
        } else {
            await salon.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon
}