const company = require('../../models/companyModel');

const companyGetProile = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

const companyPatchProfile = async (req, res) => {
  try {
    if (req.body.hiring_for) {
      if (req.body.hiring_for === 'on') {
        req.body.hiring_for = true;
      }
    }
    if (req.body.looking_for) {
      if (req.body.looking_for === 'on') {
        req.body.looking_for = true;
      }
    }

    const updatedUser = await company.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
      redirect: '/home',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const companyPatchPic = async (req, res) => {
  try {
    const updatedUser = await company.findByIdAndUpdate(
      req.user._id,
      { profilePicture: req.file.path },
      { new: true }
    );
    res.json({
      message: 'Profile Pic updated successfully',
      filename: req.file.filename,
      user: updatedUser,
      redirect: '/profile/company',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { companyGetProile, companyPatchProfile, companyPatchPic };
