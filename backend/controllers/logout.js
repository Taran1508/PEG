const jwt = require('jsonwebtoken');

const logOut = (req, res) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    console.log('No token');
    return res.status(401).json({ message: 'Access Denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role;
    console.log(role);
    res
      .status(200)
      .json({ message: 'Logged Out Succesfully', redirect: `/login/${role}` });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Invalid Tokennnnn' });
  }
};

module.exports = logOut;
