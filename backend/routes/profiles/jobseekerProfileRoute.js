const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  jobseekerGetProile,
  jobseekerPatchProfile,
  jobseekerPatchPic,
  jobseekerPatchRes,
} = require('../../controllers/profiles/jobseekerProfileController');
const jobseekerAuthMiddleware = require('../../middleware/jobseekerAuthMiddleware');
const {
  uploadRes,
  uploadFile,
} = require('../../middleware/multerPfpMiddleware');

const router = express.Router();

router.get('/', authMiddleware, jobseekerGetProile);
router.patch('/', jobseekerAuthMiddleware, jobseekerPatchProfile);
router.patch('/pfp', uploadFile, jobseekerAuthMiddleware, jobseekerPatchPic);
router.patch('/res', uploadRes, jobseekerAuthMiddleware, jobseekerPatchRes);

module.exports = router;
