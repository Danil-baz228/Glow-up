const express = require('express');
const saveMasterAddress = require('../controllers/addressController');

const router = express.Router();

router.post('/', saveMasterAddress);

module.exports = router;