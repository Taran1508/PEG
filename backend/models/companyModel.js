const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  num: { type: Number },
  location: { type: String },
  companyName: { type: String },
  redgno: { type: String },
  gstin: { type: String },
  password: { type: String },
  role: {
    type: String,
    default: 'Company',
  },
  company_details: {
    website: { type: String, required: true },
    industry: { type: String, required: true },
  },

  company_size: {
    type: String,
    enum: ['1-10', '10-50', '50-200', '200+ employees'],
    required: true,
  },

  stage_of_company: {
    type: String,
    enum: ['Idea Stage', 'MVP', 'Early Traction', 'Growth'],
    required: true,
  },

  hiring_for: [
    {
      type: String,
      enum: ['Interns', 'Full-time Employees', 'Freelancers', 'Co-founders'],
    },
  ],

  funding_status: {
    type: String,
    enum: ['Bootstrapped', 'Seed Funded', 'Series A', 'Series B+'],
    required: true,
  },

  looking_for: [
    {
      type: String,
      enum: ['Hiring', 'Investors', 'Partnerships', 'Service Providers'],
    },
  ],

  company_pitch_deck: {
    type: String, // Store as a file URL if uploaded
  },

  social_links: {
    github: { type: String },
    linkedin: { type: String },
    personal_website: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    threads: { type: String },
  },
});

module.exports = mongoose.model('Company', companySchema);
