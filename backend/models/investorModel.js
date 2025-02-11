const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  num: { type: Number },
  location: { type: String },
  linkedIn: { type: String },
  password: { type: String },

  role: {
    type: String,
    enum: ['student', 'investor', 'company', 'jobseeker', 'founder'],
    default: 'investor',
  },

  investor_type: {
    type: String,
    enum: ['Angel Investor', 'Venture Capitalist', 'Corporate VC', 'Govt Fund'],
    required: true,
  },

  investment_range: {
    type: String,
    enum: ['₹5L - ₹50L', '₹50L - ₹2Cr', '₹2Cr+'],
    required: true,
  },

  preferred_startup_stages: [
    {
      type: String,
      enum: ['Idea', 'MVP', 'Growth', 'Scale-up'],
      required: true,
    },
  ],

  industries_interested_in: [{ type: String }],

  portfolio: [
    {
      startup_name: { type: String },
      website: { type: String },
    },
  ],

  mode_of_investment: [
    {
      type: String,
      enum: ['Equity', 'Debt', 'Convertible Note', 'Grants'],
      required: true,
    },
  ],

  availability_for_mentorship: {
    type: Boolean,
    default: false,
  },

  social_links: {
    github: { type: String },
    linkedin: { type: String },
    personal_website: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    threads: { type: String },
  },
  isLoggedIn: { type: Boolean, default: true },
});
module.exports = mongoose.model('Investor', investorSchema);
