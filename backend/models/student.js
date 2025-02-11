const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  num: { type: Number },
  location: { type: String },
  password: { type: String },

  role: {
    type: String,
    enum: ['student', 'investor', 'company', 'jobseeker', 'founder'],
    default: 'student',
  },
  profilePicture: { type: String },
  // Education Details
  education: {
    graduation: {
      college_university: { type: String },
      degree: { type: String },
      year_of_study: { type: String },
      branch: { type: String },
    },
    inter_diploma: {
      college_university: { type: String },
      diploma_or_inter: { type: String },
      year_of_study: { type: String },
      major: { type: String },
    },
    schooling: {
      school: { type: String },
      syllabus: { type: String },
      year_of_study: { type: String },
      address: { type: String },
    },
  },

  // Skills & Interests
  skills_and_interests: {
    skills: [{ type: String }],
    interests: [{ type: String }],
  },

  // Portfolio
  portfolio: {
    github: { type: String },
    linkedIn: { type: String },
    personal_website: { type: String },
  },

  // Looking For Opportunities
  looking_for: {
    internships: { type: Boolean, default: false },
    freelance_projects: { type: Boolean, default: false },
    startup: { type: Boolean, default: false },
    learning_teaching: { type: Boolean, default: false },
  },

  // Resume Upload (PDF format)
  resume: {
    pdf_url: { type: String },
    uploaded_at: { type: Date },
  },

  // Employment Availability
  availability: { type: String },
  isLoggedIn: { type: Boolean, default: true },
});

module.exports = mongoose.model('Student', studentSchema);
