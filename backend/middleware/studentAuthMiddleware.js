const jwt = require('jsonwebtoken');
const student = require('../models/student');
require('dotenv').config();

const studentAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log('recieved token');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await student.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = studentAuthMiddleware;
