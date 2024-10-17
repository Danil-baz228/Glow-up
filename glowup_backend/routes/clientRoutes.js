const express = require('express');
const { getAllClients, createClient, deleteClient, getClientById, updateClient,
    getFavoriteMasters,
    addFavoriteMaster,
    removeFavoriteMaster
} = require('../controllers/clientController');

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.get('/:clientId/favorite-master', getFavoriteMasters);
router.post('/:clientId/favorite-master', addFavoriteMaster);
router.delete('/:clientId/favorite-master', removeFavoriteMaster);

module.exports = router;
