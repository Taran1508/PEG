const Student = require('../../models/student');
const bcrypt = require('bcryptjs');

const studentRegisterController = async (req, res) => {
  try {
    const { name, email, collegeName, num, linkedIn, password } = req.body;
    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      return res
        .status(409)
        .json({ message: 'User already exists', redirect: '/login/student' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Student({
      name,
      email,
      collegeName,
      num,
      linkedIn,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: `Congratulations ${name}, your account has been created!`,
      redirect: '/login/student',
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, redirect: '/register/student' });
  }
};

module.exports = { studentRegisterController };
