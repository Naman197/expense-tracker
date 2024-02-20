const mongoose = require('mongoose');
const User = require('./userSchema');
const tipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  tipText: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
