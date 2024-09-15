const Master = require('../models/Master');

const getAllMasters = async (req, res) => {
    try {
        const masters = await Master.findAll();
        res.status(200).json(masters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMasterById = async (req, res) => {
    try {
        const master = await Master.findByPk(req.params.id);
        if (!master) {
            res.status(404).json({ message: 'Master not found' });
        } else {
            res.status(200).json(master);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createMaster = async (req, res) => {
    try {
        const master = await Master.create(req.body);
        res.status(201).json(master);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMaster = async (req, res) => {
    try {
        const master = await Master.findByPk(req.params.id);
        if (!master) {
            res.status(404).json({ message: 'Master not found' });
        } else {
            await master.update(req.body);
            res.status(200).json(master);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteMaster = async (req, res) => {
    try {
        const master = await Master.findByPk(req.params.id);
        if (!master) {
            res.status(404).json({ message: 'Master not found' });
        } else {
            await master.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllMasters,
    getMasterById,
    createMaster,
    updateMaster,
    deleteMaster
}