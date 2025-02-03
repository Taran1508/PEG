const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  collegeName: { type: String },
  courseName: { type: String },
  linkedIn: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('Student', studentSchema);
