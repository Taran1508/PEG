const express = require('express');
const forgotPassword = require('../controllers/forgorPassword');
const router = express.Router();

router.post('/', forgotPassword);

module.exports = router;
