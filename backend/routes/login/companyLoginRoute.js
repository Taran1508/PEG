const express = require('express');
const {
  companyLoginController,
} = require('../../controllers/login/companyLoginController');
const router = express.Router();

router.post('/', companyLoginController);

module.exports = router;
