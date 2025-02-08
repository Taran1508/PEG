const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  founderGetProile,
  founderPatchProfile,
} = require('../../controllers/profiles/founderProfileController');
const founderAuthMiddleware = require('../../middleware/founderAuthMiddleware');
const router = express.Router();

router.get('/', authMiddleware, founderGetProile);
router.patch('/', founderAuthMiddleware, founderPatchProfile);

module.exports = router;
