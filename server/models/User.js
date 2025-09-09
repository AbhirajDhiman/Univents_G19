const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required:true },
  email: { type: String, required:true, unique:true },
  password: { type: String, required:true },
  role: { type: String, enum: ['admin','organizer','participant'], default:'participant' }
}, { timestamps: true });

// hash password before save
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(plain){
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', UserSchema);
