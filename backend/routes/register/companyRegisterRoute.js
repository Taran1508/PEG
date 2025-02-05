const express = require('express');
const {
  companyRegisterController,
} = require('../../controllers/register/companyRegisterController');

const router = express.Router();

router.post('/', companyRegisterController);

module.exports = router;
