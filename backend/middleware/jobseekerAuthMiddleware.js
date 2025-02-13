const jwt = require('jsonwebtoken');
const jobseeker = require('../models/jobseekerModel');
require('dotenv').config();

const roles = ['student', 'investor', 'company', 'jobseeker', 'founder'];

const jobseekerAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log('recieved token');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(decoded.role))
      return res.status(403).json({ message: 'Access denied' });
    const user = await jobseeker.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = jobseekerAuthMiddleware;
