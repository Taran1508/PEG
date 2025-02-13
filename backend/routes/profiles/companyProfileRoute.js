const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  companyGetProile,
  companyPatchProfile,
  companyPatchPic,
} = require('../../controllers/profiles/companyProfileController');
const companyAuthMiddleware = require('../../middleware/companyAuthMiddleware');
const { uploadFile } = require('../../middleware/multerPfpMiddleware');

const router = express.Router();

router.get('/', authMiddleware, companyGetProile);
router.patch('/', companyAuthMiddleware, companyPatchProfile);
router.patch('/pfp', uploadFile, companyAuthMiddleware, companyPatchPic);

module.exports = router;
