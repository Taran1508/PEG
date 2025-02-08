const express = require('express');
const {
  jobseekerLoginController,
} = require('../../controllers/login/jobseekerLoginController');
const router = express.Router();

router.post('/', jobseekerLoginController);

module.exports = router;
