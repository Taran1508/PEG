const express = require('express');
const Student = require('../../models/student');
const {
  studentRegisterController,
} = require('../../controllers/register/studentRegisterController');
const router = express.Router();

router.post('/', studentRegisterController);

module.exports = router;
