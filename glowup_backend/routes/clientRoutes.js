const express = require('express');
const { getAllClients, createClient, deleteClient, getClientById, updateClient } = require('../controllers/clientController');

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);
router.get('/:id', getClientById);
router.put('/:id', updateClient);

module.exports = router;
