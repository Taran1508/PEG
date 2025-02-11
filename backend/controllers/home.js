const getHome = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

module.exports = getHome;
