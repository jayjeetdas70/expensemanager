const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const expenseRouter = require("./routes/expenseRoutes");

const app = express();

console.log(`you are in ${process.env.NODE_ENV} mode`);

//Body parser reading data from body to req.body
app.use(express.json());

app.use("/api/v1/expenses", expenseRouter);

//Handling unhandled routes

app.use(globalErrorHandler);

module.exports = app;
