const express = require('express');
const {
  founderRegisterController,
} = require('../../controllers/register/founderRegisterController');

const router = express.Router();

router.post('/', founderRegisterController);

module.exports = router;
