const jobseeker = require('../../models/jobseekerModel');

const jobseekerGetProile = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

const jobseekerPatchProfile = async (req, res) => {
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

    const updatedUser = await jobseeker.findByIdAndUpdate(
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

const jobseekerPatchPic = async (req, res) => {
  try {
    const updatedUser = await jobseeker.findByIdAndUpdate(
      req.user._id,
      { profilePicture: req.file.path },
      { new: true }
    );
    res.json({
      message: 'Profile Pic updated successfully',
      filename: req.file.filename,
      imageUrl: req.file.path,
      user: updatedUser,
      redirect: '/profile/jobseeker',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const jobseekerPatchRes = async (req, res) => {
  try {
    const updatedUser = await jobseeker.findByIdAndUpdate(
      req.user._id,
      { resume_upload: req.file.path },
      { new: true }
    );
    res.json({
      message: 'Resume Uploaded successfully',
      filename: req.file.filename,
      resUrl: req.file.path,
      user: updatedUser,
      redirect: '/profile/jobseeker',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  jobseekerGetProile,
  jobseekerPatchProfile,
  jobseekerPatchPic,
  jobseekerPatchRes,
};
