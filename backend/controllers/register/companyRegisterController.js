const company = require('../../models/companyModel');
const bcrypt = require('bcryptjs');

const companyRegisterController = async (req, res) => {
  try {
    const { name, email, companyName, regdno, num, password } = req.body;
    const emailExists = await company.findOne({ email });
    if (emailExists) {
      return res
        .status(409)
        .json({ message: 'User already exists', redirect: '/login/company' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new company({
      name,
      email,
      companyName,
      regdno,
      num,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: `Congratulations ${name}, your account has been created!`,
      redirect: '/login/company',
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, redirect: '/register/company' });
  }
};

module.exports = { companyRegisterController };
