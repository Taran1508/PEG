const express = require('express');
const { default: mongoose } = require('mongoose');
const Student = require('../../models/student');
const {
  studentRegisterController,
} = require('../../controllers/register/studentRegisterController');
const router = express.Router();

router.post('/', studentRegisterController);

module.exports = router;
