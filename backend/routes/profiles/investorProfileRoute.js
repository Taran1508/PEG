const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const investorAuthMiddleware = require('../../middleware/investorAuthMiddleware');
const {
  investorPatchProfile,
  investorGetProile,
  investorPatchPic,
} = require('../../controllers/profiles/investorProfileController');
const { uploadFile } = require('../../middleware/multerPfpMiddleware');

const router = express.Router();

router.get('/', authMiddleware, investorGetProile);
router.patch('/', investorAuthMiddleware, investorPatchProfile);
router.patch('/pfp', uploadFile, investorAuthMiddleware, investorPatchPic);

module.exports = router;
