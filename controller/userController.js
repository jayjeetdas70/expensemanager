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
