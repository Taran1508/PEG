const express = require('express');
const {
  investorLoginController,
} = require('../../controllers/login/investorLoginController');
const router = express.Router();

router.post('/', investorLoginController);

module.exports = router;
