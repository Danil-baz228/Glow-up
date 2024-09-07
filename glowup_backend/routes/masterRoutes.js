const express = require('express');
const { getAllMasters } = require('../controllers/masterController');

const router = express.Router();

router.get('/', getAllMasters);

module.exports = router;
