const express = require('express');
const {
  investorRegisterController,
} = require('../../controllers/register/investorRegisterController');

const router = express.Router();

router.post('/', investorRegisterController);
router.get('/', (req, res) => {
  res.send('Hello from Investor Register');
});

module.exports = router;
