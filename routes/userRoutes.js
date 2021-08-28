const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.patch("/deleteMe", authController.protect, userController.deleteMe);

module.exports = router;
