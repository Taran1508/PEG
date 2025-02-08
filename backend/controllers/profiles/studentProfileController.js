const student = require('../../models/student');

const studentGetProile = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

const studentPatchProfile = async (req, res) => {
  try {
    if (req.body.looking_for) {
      if (req.body.looking_for.learning_teaching === 'on') {
        req.body.looking_for.learning_teaching = true;
      }

      if (req.body.looking_for.internships === 'on') {
        req.body.looking_for.internships = true;
      }
      if (req.body.looking_for.freelance_projects === 'on') {
        req.body.looking_for.freelance_projects = true;
      }

      if (req.body.looking_for.startup === 'on') {
        req.body.looking_for.startup = true;
      }
    }

    const updatedUser = await student.findByIdAndUpdate(
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

module.exports = { studentGetProile, studentPatchProfile };
