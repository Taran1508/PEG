const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const getHome = require('../controllers/home');
const router = express.Router();

router.get('/', authMiddleware, getHome);

module.exports = router;
