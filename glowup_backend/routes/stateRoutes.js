const express = require('express');
const { getAllStates, createState, deleteState, getStateById, updateState } = require('../controllers/stateController');

const router = express.Router();

router.get('/', getAllStates);
router.post('/', createState);
router.delete('/:id', deleteState);
router.get('/:id', getStateById);
router.put('/:id', updateState);

module.exports = router;