const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Account created' });
  } catch(err) {
    if (err.code === 11000) return res.status(400).json({ error: 'Email exists' });
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if(!u) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await u.comparePassword(password);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: u._id, name: u.name, role: u.role } });
});

module.exports = router;
