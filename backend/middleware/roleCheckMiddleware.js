const checkRole = () => (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  try {
    const roles = ['student', 'investor', 'company', 'jobseeker', 'founder'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(decoded.role))
      return res.status(403).json({ message: 'Access denied' });
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};
