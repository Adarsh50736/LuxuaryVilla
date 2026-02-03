const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  villaName: String,
  price: Number,
  country: String,
  guests: Number,
  checkIn: Date,
  checkOut: Date,
  paymentId: String,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
