const { Client, Master } = require('../models/Relations');

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

const addFavoriteMaster = async (req, res) => {
    try {
        const { clientId } = req.params;
        const { master_id } = req.body;
        const client = await Client.findByPk(clientId);
        const master = await Master.findByPk(master_id);
        console.log(clientId, master_id);
        if (!client || !master) {
            return res.status(404).json({ message: 'Client or Master not found' });
        }
        await client.addMaster(master);
        res.status(200).json({ message: 'Master added to favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFavoriteMaster = async (req, res) => {
    try {
        const { clientId } = req.params;
        const { master_id } = req.body;
        const client = await Client.findByPk(clientId);
        const master = await Master.findByPk(master_id);
        await client.removeMaster(master);
        res.status(200).json({ message: 'Master removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFavoriteMasters = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.clientId, {
            include: Master
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client.Masters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    addFavoriteMaster,
    removeFavoriteMaster,
    getFavoriteMasters
}