const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  companyGetProile,
  companyPatchProfile,
} = require('../../controllers/profiles/companyProfileController');
const companyAuthMiddleware = require('../../middleware/companyAuthMiddleware');

const router = express.Router();

router.get('/', authMiddleware, companyGetProile);
router.patch('/', companyAuthMiddleware, companyPatchProfile);

module.exports = router;
