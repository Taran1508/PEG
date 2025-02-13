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

const studentPatchPic = async (req, res) => {
  try {
    const updatedUser = await student.findByIdAndUpdate(
      req.user._id,
      { profilePicture: req.file.path },
      { new: true }
    );
    res.json({
      message: 'Profile Pic updated successfully',
      filename: req.file.filename,
      imageUrl: req.file.path,
      user: updatedUser,
      redirect: '/profile/student',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const studentPatchRes = async (req, res) => {
  try {
    console.log('File received:', req.file);
    const updatedUser = await student.findByIdAndUpdate(
      req.user._id,
      { resume_upload: req.file.path },
      { new: true }
    );
    res.json({
      message: 'Resume Uploaded successfully',
      filename: req.file.filename,
      resUrl: req.file.path,
      user: updatedUser,
      redirect: '/profile/student',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  studentGetProile,
  studentPatchProfile,
  studentPatchPic,
  studentPatchRes,
};
