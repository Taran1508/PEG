const express = require('express');
const logOut = require('../controllers/logout');
const router = express.Router();

router.post('/', logOut);

module.exports = router;
