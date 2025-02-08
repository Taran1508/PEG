const founder = require('../../models/founderModel');

const founderGetProile = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

const founderPatchProfile = async (req, res) => {
  try {
    if (req.body.preferred_startup_stages) {
      if (req.body.preferred_startup_stages === 'on') {
        req.body.preferred_startup_stages = true;
      }
    }
    if (req.body.mode_of_investment) {
      if (req.body.mode_of_investment === 'on') {
        req.body.mode_of_investment = true;
      }
    }
    if (req.body.availability_for_mentorship) {
      if (req.body.availability_for_mentorship === 'on') {
        req.body.availability_for_mentorship = true;
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

module.exports = { founderGetProile, founderPatchProfile };
