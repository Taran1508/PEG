const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  num: { type: Number },
  location: { type: String },
  linkedIn: { type: String },
  password: { type: String },

  role: {
    type: String,
    enum: ['student', 'investor', 'company', 'jobseeker', 'founder'],
    default: 'founder',
  },
  startup_stage: {
    type: String,
    enum: ['Idea Stage', 'MVP', 'Early Traction', 'Growth'],
  },

  industry_domain: [
    {
      type: String,
      enum: ['EdTech', 'FinTech', 'SaaS', 'AI', 'Other'],
    },
  ],

  looking_for: [
    {
      type: String,
      enum: ['Co-founder', 'Team Members', 'Mentors', 'Investors', 'Customers'],
    },
  ],

  skills_expertise: [
    {
      type: String,
      enum: ['Product', 'Tech', 'Marketing', 'Business Development'],
    },
  ],

  problem_statement_overview: {
    type: String, // Explanation of the problem and target audience
  },

  business_model_overview: {
    type: String, // Explanation of revenue generation plans
  },

  pitch_deck: {
    type: mongoose.Schema.Types.Mixed, // Store PDF URL if uploaded
  },

  funding_requirement: {
    type: String,
    enum: ['Bootstrapped', 'Looking for Angel Investment', 'VC funding'],
  },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
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

module.exports = mongoose.model('Founder', founderSchema);
