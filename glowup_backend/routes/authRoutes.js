const express = require('express');

const { register, login, verifyEmail, requestPasswordReset, resetPassword } = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;