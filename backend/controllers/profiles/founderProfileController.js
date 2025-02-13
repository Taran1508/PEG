const founder = require('../../models/founderModel');

const founderGetProile = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

const founderPatchProfile = async (req, res) => {
  try {
    if (req.body.industry_domain) {
      if (req.body.industry_domain === 'on') {
        req.body.industry_domain = true;
      }
    }
    if (req.body.looking_for) {
      if (req.body.looking_for === 'on') {
        req.body.looking_for = true;
      }
    }
    if (req.body.skills_expertise) {
      if (req.body.skills_expertise === 'on') {
        req.body.skills_expertise = true;
      }
    }

    const updatedUser = await founder.findByIdAndUpdate(
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

const founderPatchPic = async (req, res) => {
  try {
    const updatedUser = await founder.findByIdAndUpdate(
      req.user._id,
      { profilePicture: req.file.path },
      { new: true }
    );
    res.json({
      message: 'Profile Pic updated successfully',
      filename: req.file.filename,
      user: updatedUser,
      redirect: '/profile/founder',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { founderGetProile, founderPatchProfile, founderPatchPic };
