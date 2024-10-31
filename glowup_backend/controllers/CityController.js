const City = require('../models/City');

const getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCityById = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (!city) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(200).json(city);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCity = async (req, res) => {
    try {
        const city = await City.create(req.body);
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCity = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (!city) {
            res.status(404).json({ message: 'City not found' });
        } else {
            await city.update(req.body);
            res.status(200).json(city);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCity = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (!city) {
            res.status(404).json({ message: 'City not found' });
        } else {
            await city.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity

}