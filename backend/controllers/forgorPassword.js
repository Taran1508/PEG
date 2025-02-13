const express = require('express');
const crypto = require('crypto');
const sendEmail = require('../config/sendEmailConfig');
const student = require('../models/student');
const investorModel = require('../models/investorModel');
const companyModel = require('../models/companyModel');
const jobseekerModel = require('../models/jobseekerModel');
const founderModel = require('../models/founderModel');

const userTypes = {
  student: student,
  investor: investorModel,
  company: companyModel,
  jobseeker: jobseekerModel,
  founder: founderModel,
};

const forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  const userSchema = userTypes[role];

  try {
    const user = await userSchema.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      'Password Reset',
      `Click here to reset your password (expires in 1 Hour): ${resetLink}`
    );

    res.json({ message: 'Password reset email sent!' });
  } catch (error) {
    console.log('Error in /forgot-password:', error);
    res.status(500).json({ message: 'Something wrong' });
  }
};

module.exports = forgotPassword;
