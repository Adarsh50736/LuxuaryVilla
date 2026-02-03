const express = require('express');
const router = express.Router();
const Villa = require('../models/villa');

// POST - Add Villa
router.post('/add', async (req, res) => {
  try {
    const villa = new Villa(req.body);
    await villa.save();
    res.status(201).json({ success: true, villa });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET - Get all Villas
router.get('/all', async (req, res) => {
  try {
    const villas = await Villa.find().sort({ createdAt: -1 });
    res.json(villas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete Villa by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const villa = await Villa.findByIdAndDelete(req.params.id);
    if (!villa) return res.status(404).json({ message: "Villa not found" });
    res.json({ success: true, message: "Villa deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ GET SINGLE VILLA BY ID
router.get("/:id", async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id);

    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }

    res.status(200).json(villa);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// GET - Get Villa by ID and Update
router.put('/edit/:id', async (req, res) => {
  try {
    const updated = await Villa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, villa: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
