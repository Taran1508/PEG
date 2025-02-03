const express = require('express');
const { default: mongoose } = require('mongoose');
const Student = require('../../models/student');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newUser = new Student(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: 'newUser added' })
      .redirect('/login/student');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
