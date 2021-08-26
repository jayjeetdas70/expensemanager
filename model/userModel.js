const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An user must have a name"],
    trim: true,
    minlength: [4, "An user must have more than or equal to 4 characters"],
  },
  email: {
    type: String,
    required: [true, "An user must have an email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  password: {
    type: String,
    required: [true, "An user must have a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        //this validator is only works on create and save.
        return el === this.password;
      },
      message: "Password are not the same.",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
});

//HASHing the password with costing of 12
userSchema.pre("save", async function (next) {
  //Runs if password is changed
  if (!this.isModified("password")) return next();
  //HASHing the password with costing of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete the confirmPassword
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000; //to milisecond
    console.log(changedTimeStamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimeStamp;
  }
  //False means Not changed
  return false;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
