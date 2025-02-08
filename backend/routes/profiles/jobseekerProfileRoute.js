const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  jobseekerGetProile,
  jobseekerPatchProfile,
} = require('../../controllers/profiles/jobseekerProfileController');
const jobseekerAuthMiddleware = require('../../middleware/jobseekerAuthMiddleware');

const router = express.Router();

router.get('/', authMiddleware, jobseekerGetProile);
router.patch('/', jobseekerAuthMiddleware, jobseekerPatchProfile);

module.exports = router;
