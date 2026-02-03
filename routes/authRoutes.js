const express = require('express');
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// GET /api/users - Show all users (admin only, for now skip role check)
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().sort({ loginDate: -1 }); // sorted by recent
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

module.exports = router;
