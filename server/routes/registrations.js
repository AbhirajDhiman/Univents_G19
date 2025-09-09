const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { auth, requireRole } = require('../middleware/auth');

router.post('/', auth, requireRole('participant'), async (req,res) => {
  const { eventId } = req.body;
  const ev = await Event.findById(eventId);
  if(!ev) return res.status(404).json({ error: 'Event not found' });

  // optional capacity check
  const regCount = await Registration.countDocuments({ event: eventId });
  if(ev.capacity && regCount >= ev.capacity) return res.status(400).json({ error: 'Event full' });

  const reg = new Registration({ event: eventId, user: req.user._id });
  await reg.save();
  res.status(201).json({ message: 'Registered' });
});

module.exports = router;
