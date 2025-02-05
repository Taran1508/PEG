const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  num: { type: Number },
  linkedIn: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('Investor', investorSchema);
