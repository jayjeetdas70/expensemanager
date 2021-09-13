const Expense = require("../model/expenseModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");

//exports.createExpense = factory.createOne(Expense);

exports.createExpense = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;

  const newExpense = await Expense.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newExpense,
    },
  });
});

exports.getAllExpenses = factory.getAll(Expense);
exports.getTheExpense = factory.getOne(Expense);
exports.updateTheExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);
