const jwt = require('jsonwebtoken');
const founder = require('../models/founderModel');
require('dotenv').config();

const founderAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log('recieved token');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await founder.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = founderAuthMiddleware;
