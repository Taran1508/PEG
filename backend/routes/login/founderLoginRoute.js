const express = require('express');
const {
  founderLoginController,
} = require('../../controllers/login/founderLoginController');

const router = express.Router();

router.post('/', founderLoginController);

module.exports = router;
