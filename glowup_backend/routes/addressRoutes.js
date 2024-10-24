const express = require('express');
const saveMasterAddress = require('../controllers/addressController');

const router = express.Router();

router.post('/save', saveMasterAddress);

module.exports = router;