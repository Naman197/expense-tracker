const mongoose = require('mongoose');
const User = require('./userSchema');
const Tip=require("./tipSchema");
const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  tipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tip', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
