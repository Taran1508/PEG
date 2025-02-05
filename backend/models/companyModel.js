const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  companyName: { type: String },
  redgno: { type: String },
  gstin: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('Company', companySchema);
