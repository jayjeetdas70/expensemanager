const express = require("express");

const expenseController = require("./../controller/expenseController");
const authController = require("./../controller/authController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, expenseController.createExpense)
  .get(expenseController.getAllExpenses);

router
  .route("/:id")
  .get(expenseController.getTheExpense)
  .patch(expenseController.updateTheExpense)
  .delete(expenseController.deleteExpense);
module.exports = router;
