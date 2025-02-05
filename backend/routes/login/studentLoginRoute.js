const express = require('express');
const {
  studentLoginController,
} = require('../../controllers/login/studentLoginController');
const router = express.Router();

router.post('/', studentLoginController);

module.exports = router;
