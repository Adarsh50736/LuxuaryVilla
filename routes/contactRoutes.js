const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// POST: Create new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while submitting form' });
  }
});

// GET: Admin fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch contact messages' });
  }
});

// DELETE a contact message by ID
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});



module.exports = router;
