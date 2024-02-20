
const User = require('./userSchema'); 
const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
