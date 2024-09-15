const Client = require("../models/Client");

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: 'Client not found' });
        } else {
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: 'Client not found' });
        } else {
            await client.update(req.body);
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: 'Client not found' });
        } else {
            await client.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
}