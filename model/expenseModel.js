const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An expense must have a name"],
    unique: true,
    trim: true,
    minlength: [8, "An Expense must have more than or equal to 8 characters"],
  },
  description: {
    type: String,
    required: [true, "An expense must have a name"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Please provide the expense amount"],
  },
  date: {
    type: Date,
    required: [true, "Expense must have a day"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
