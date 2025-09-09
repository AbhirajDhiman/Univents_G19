const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: String,
  date: Date,
  venue: String,
  capacity: Number,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft','pending','approved','archived'], default: 'draft' }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
