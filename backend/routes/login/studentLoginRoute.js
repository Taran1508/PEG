const express = require('express');
const { default: mongoose } = require('mongoose');
const student = require('../../models/student');
const {
  studentLoginController,
} = require('../../controllers/login/studentLoginController');
const router = express.Router();

router.post('/', studentLoginController);

module.exports = router;
