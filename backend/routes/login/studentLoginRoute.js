const express = require('express');
const { default: mongoose } = require('mongoose');
const student = require('../../models/student');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, pass } = req.body;
  const existingUser = await student.findOne({ name });
  if (!existingUser) {
    console.log('User not found');
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ message: `${req.body.name} logged in` });
  // .redirect('/home');
});

module.exports = router;
