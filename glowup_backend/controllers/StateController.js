const {State} = require('../models/Relations');

const getAllStates = async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStateById = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id);
        if (!state) {
            res.status(404).json({ message: 'State not found' });
        } else {
            res.status(200).json(state);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createState = async (req, res) => {
    try {
        const state = await State.create(req.body);
        res.status(201).json(state);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateState = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id);
        if (!state) {
            res.status(404).json({ message: 'State not found' });
        } else {
            await state.update(req.body);
            res.status(200).json(state);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteState = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id);
        if (!state) {
            res.status(404).json({ message: 'State not found' });
        } else {
            await state.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllStates,
    getStateById,
    createState,
    updateState,
    deleteState
};

