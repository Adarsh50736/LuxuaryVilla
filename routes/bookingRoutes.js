const express = require('express');
const Razorpay = require('razorpay');
const Booking = require('../models/booking');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("Received amount:", amount); // 👈 log it

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Amount is required and must be a number" });
    }

    const options = {
      amount: parseInt(amount),
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);

  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(400).json({ error: "Razorpay order creation failed" });
  }
});



// Save booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin panel (GET all)
router.get('/all', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Express route
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Booking not found");
    res.send({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});



module.exports = router;
