const express = require('express');
const passport = require('../config/passportConfig');
const jwt = require('jsonwebtoken');

const router = express.Router();

const sendTokenResponse = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  const userType = req.query.state;
  console.log(`${userType} user`);

  if (
    !['student', 'investor', 'company', 'jobseeker', 'founders'].includes(
      userType
    )
  ) {
    return res.status(400).json({ error: `Invalid user ${userType}` });
  }
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email, userType },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.redirect(`http://localhost:3000/profile/${userType}/?token=${token}`);
};

// Google OAuth Routes
router.get('/google/', (req, res, next) => {
  const userType = req.query.state;
  console.log('Query Parameters:', req.query);
  console.log('Extracted userType:', userType);
  if (
    !['student', 'investor', 'company', 'jobseeker', 'founder'].includes(
      userType
    )
  ) {
    return res.status(400).json({ error: `Invalid User ${userType}` });
  }
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: userType,
  })(req, res, next);
});
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  sendTokenResponse
);

// GitHub OAuth Routes
router.get('/github', (req, res, next) => {
  const userType = req.query.state;
  console.log('Query Parameters:', req.query);
  console.log('Extracted userType:', userType);
  if (
    !['student', 'investor', 'company', 'jobseeker', 'founder'].includes(
      userType
    )
  ) {
    return res.status(400).json({ error: 'Invalid user type' });
  }
  passport.authenticate('github', { scope: ['user:email'], state: userType })(
    req,
    res,
    next
  );
});
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  sendTokenResponse
);

// // Microsoft OAuth Routes
// router.get('/microsoft', passport.authenticate('microsoft'));
// router.get(
//   '/microsoft/callback',
//   passport.authenticate('microsoft', { session: false }),
//   sendTokenResponse
// );

module.exports = router;
