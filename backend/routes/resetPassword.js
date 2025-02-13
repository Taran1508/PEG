const express = require('express');
const resetPassword = require('../controllers/resetPassword');
const router = express.Router();

router.post('/:token', resetPassword);

module.exports = router;
