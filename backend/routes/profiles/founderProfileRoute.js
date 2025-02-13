const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  founderGetProile,
  founderPatchProfile,
  founderPatchPic,
} = require('../../controllers/profiles/founderProfileController');
const founderAuthMiddleware = require('../../middleware/founderAuthMiddleware');
const { uploadFile } = require('../../middleware/multerPfpMiddleware');
const router = express.Router();

router.get('/', authMiddleware, founderGetProile);
router.patch('/', founderAuthMiddleware, founderPatchProfile);
router.patch('/pfp', uploadFile, founderAuthMiddleware, founderPatchPic);

module.exports = router;
