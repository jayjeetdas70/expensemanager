const Expense = require("../model/expenseModel");
const factory = require("./handlerFactory");

exports.createExpense = factory.createOne(Expense);
