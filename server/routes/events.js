const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const events = await Event.find({ status: 'approved' }).populate('organizer', 'name email');
  res.json(events);
});

// organizer-only create
router.post('/', auth, requireRole('organizer'), async (req,res) => {
  const data = req.body;
  data.organizer = req.user._id;
  const ev = new Event(data);
  await ev.save();
  res.status(201).json(ev);
});

// admin/organizer update (simplified)
router.patch('/:id', auth, async (req,res) => {
  const ev = await Event.findById(req.params.id);
  if(!ev) return res.status(404).end();
  // only organizer who owns it or admin
  if(ev.organizer.toString() !== req.user._id.toString() && req.user.role!=='admin') return res.status(403).end();
  Object.assign(ev, req.body);
  await ev.save();
  res.json(ev);
});

module.exports = router;
