const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"]
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please add password"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);
