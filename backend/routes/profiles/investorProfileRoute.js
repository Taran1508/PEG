const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const investorAuthMiddleware = require('../../middleware/investorAuthMiddleware');
const {
  investorPatchProfile,
  investorGetProile,
} = require('../../controllers/profiles/investorProfileController');

const router = express.Router();

router.get('/', authMiddleware, investorGetProile);
router.patch('/', investorAuthMiddleware, investorPatchProfile);

module.exports = router;
