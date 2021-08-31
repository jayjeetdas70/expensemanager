const Expense = require("../model/expenseModel");
const factory = require("./handlerFactory");

exports.createExpense = factory.createOne(Expense);
exports.getAllExpenses = factory.getAll(Expense);
exports.getTheExpense = factory.getOne(Expense);
exports.updateTheExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);
