const express = require('express');
const {
  jobseekerRegisterController,
} = require('../../controllers/register/jobseekerRegisterController');

const router = express.Router();

router.post('/', jobseekerRegisterController);

module.exports = router;
