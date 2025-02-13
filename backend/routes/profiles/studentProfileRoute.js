const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  studentGetProile,
  studentPatchProfile,
  studentPatchPic,
  studentPatchRes,
} = require('../../controllers/profiles/studentProfileController');
const studentAuthMiddleware = require('../../middleware/studentAuthMiddleware');
const {
  uploadFile,
  uploadRes,
} = require('../../middleware/multerPfpMiddleware');

const router = express.Router();

router.get('/', authMiddleware, studentGetProile);
router.patch('/', studentAuthMiddleware, studentPatchProfile);
router.patch('/pfp', uploadFile, studentAuthMiddleware, studentPatchPic);
router.patch('/res', uploadRes, studentAuthMiddleware, studentPatchRes);

module.exports = router;
