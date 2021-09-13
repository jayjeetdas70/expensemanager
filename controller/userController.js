const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create error if user attempt to change password

  // console.log(req.file);

  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates,Please use /changePassword",
        400
      )
    );
  }
  //2)Filtered out unwanted fields name,those are not allowed to updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  //3)Updated the document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "Your data updated successfully",
    data: {
      user: updatedUser,
    },
  });
});

//delete user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    message: "Your account de-activated successfully",
    data: null,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const users = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const allUser = await User.find();
  res.status(200).json({
    status: "success",
    result: allUser.length,
    data: {
      allUser,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("expenses");
  if (!user) {
    return next(new AppError("No item found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
