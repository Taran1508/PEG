const Student = require('../../models/student');
const bcrypt = require('bcryptjs');

const studentRegisterController = async (req, res) => {
  try {
    const { name, email, collegeName, courseName, linkedIn, password } =
      req.body;
    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Student({
      name,
      email,
      collegeName,
      courseName,
      linkedIn,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'newUser added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { studentRegisterController };
