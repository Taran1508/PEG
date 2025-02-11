const jobseeker = require('../../models/jobseekerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jobseekerLoginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Login attempt:', email);
    const existingUser = await jobseeker.findOne({ email });
    if (!existingUser) {
      console.log('User not found');
      return res
        .status(404)
        .json({ message: 'User not found', redirect: '/register/jobseeker' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: 'Invalid credentials', redirect: '/login/jobseeker' });

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      }
    );

    console.log(token, role, { user: existingUser.role });

    let firstLogin = existingUser.isLoggedIn;
    if (firstLogin) {
      existingUser.isLoggedIn = false;
      await existingUser.save();
    }

    return res.status(200).json({
      message: 'Login successful',
      role,
      user: existingUser.role,
      firstLogin,
      token,
      redirect: firstLogin ? '/profile/jobseeker' : '/home',
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { jobseekerLoginController };
