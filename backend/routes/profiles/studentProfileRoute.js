const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  studentGetProile,
  studentPatchProfile,
} = require('../../controllers/profiles/studentProfileController');
const studentAuthMiddleware = require('../../middleware/studentAuthMiddleware');

const router = express.Router();

router.get('/', authMiddleware, studentGetProile);
router.patch('/', studentAuthMiddleware, studentPatchProfile);

module.exports = router;
