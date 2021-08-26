const jwt = require("jsonwebtoken");

const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const express = require("express");
const app = express();

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exists
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  //check if user with current email and password is exists
  const user = await User.findOne({ email }).select("+password");
  // console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //if everything is ok then send the token to client

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  //2) Verification Of Token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decode);
  //3)Check if user Still Exists
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return next(
      new AppError("The user Belong to this token Does not exist", 401)
    );
  }
  //4)Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError("User recently changed password,please login again", 401)
    );
  }
  req.user = freshUser;
  // console.log(req.user)
  next();
});