const founder = require('../../models/founderModel');
const bcrypt = require('bcryptjs');

const founderRegisterController = async (req, res) => {
  console.log('Received request', req.body);
  try {
    const { name, email, num, linkedIn, password } = req.body;
    const emailExists = await founder.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new founder({
      name,
      email,
      num,
      linkedIn,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: `Congratulations ${name}, your account has been created!`,
      redirect: '/login/founder',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { founderRegisterController };
