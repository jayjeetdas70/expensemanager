const express = require("express");

const expenseController = require("./../controller/expenseController");

const router = express.Router();

router.route("/").post(expenseController.createExpense);

module.exports = router;
