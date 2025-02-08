const mongoose = require('mongoose');

const jobseekerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  num: { type: Number },
  location: { type: String },
  linkedIn: { type: String },
  password: { type: String },
  role: {
    type: String,
    default: 'Jobseeker',
  },
  education_details: {
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

  professional_experience: {
    total_experience: { type: String },
    industry: { type: String },
    current_ctc: { type: String },
    expected_ctc: { type: String },
    latest_work_experience: {
      role: { type: String },
      experience_in_current_role: { type: String },
      skills_learned_in_role: [{ type: String }],
    },
  },

  skills_expertise: [{ type: String }],

  portfolio: {
    github: { type: String },
    linkedin: { type: String },
    personal_website: { type: String },
  },

  looking_for: [
    {
      type: String,
      enum: [
        'Full-time',
        'Part-time',
        'Freelance projects',
        'Startup',
        'Learning & Teaching',
      ],
    },
  ],

  resume_upload: {
    type: String,
  },

  availability: {
    notice_period: { type: String },
  },
});

module.exports = mongoose.model('Jobseeker', jobseekerSchema);
