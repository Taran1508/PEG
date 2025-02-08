const founder = require('../../models/founderModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const founderLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    const existingUser = await founder.findOne({ email });
    if (!existingUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { founderLoginController };
