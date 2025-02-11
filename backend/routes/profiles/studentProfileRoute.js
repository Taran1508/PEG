const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  studentGetProile,
  studentPatchProfile,
  studentPatchPic,
} = require('../../controllers/profiles/studentProfileController');
const studentAuthMiddleware = require('../../middleware/studentAuthMiddleware');
const { uploadFile } = require('../../middleware/multerPfpMiddleware');

const router = express.Router();

router.get('/', authMiddleware, studentGetProile);
router.patch('/', studentAuthMiddleware, studentPatchProfile);
router.patch('/pfp', uploadFile, studentAuthMiddleware, studentPatchPic);

module.exports = router;
