const bcrypt = require('bcryptjs');
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

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(password);

  try {
    let user = null;
    for (const model of Object.values(userTypes)) {
      user = await model.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() },
      });
      if (user) break;
    }
    if (!user)
      return res
        .status(400)
        .json({
          message: 'Invalid or expired token',
          redirect: '/forgot-password',
        });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ message: 'Password successfully reset!', redirect: '/' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = resetPassword;
