const Service = require('../models/Service');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            await service.update(req.body);
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            await service.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
}