const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  country: { type: String, required: true },
  location: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  size: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('villa', villaSchema);
