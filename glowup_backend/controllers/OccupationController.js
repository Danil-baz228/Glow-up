const Occupation = require('../models/Occupation');

const getAllOccupations = async (req, res) => {
    try {
        const occupations = await Occupation.findAll();
        res.status(200).json(occupations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOccupationById = async (req, res) => {
    try {
        const occupation = await Occupation.findByPk(req.params.id);
        if (!occupation) {
            res.status(404).json({ message: 'Occupation not found' });
        } else {
            res.status(200).json(occupation);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOccupation = async (req, res) => {
    try {
        const occupation = await Occupation.create(req.body);
        res.status(201).json(occupation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOccupation = async (req, res) => {
    try {
        const occupation = await Occupation.findByPk(req.params.id);
        if (!occupation) {
            res.status(404).json({ message: 'Occupation not found' });
        } else {
            await occupation.update(req.body);
            res.status(200).json(occupation);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOccupation = async (req, res) => {
    try {
        const occupation = await Occupation.findByPk(req.params.id);
        if (!occupation) {
            res.status(404).json({ message: 'Occupation not found' });
        } else {
            await occupation.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOccupations,
    getOccupationById,
    createOccupation,
    updateOccupation,
    deleteOccupation
}