const express = require("express");

const authController = require("../controller/authController");
const userController = require("../controller/userController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.get(
  "/getUserByAuth",
  authController.protect,
  authController.getUserByAuth
);

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUser);

router.patch(
  "/updateMe",
  authController.protect,
  userController.upload.single("photo"),
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch("/deleteMe", authController.protect, userController.deleteMe);

router.get("/:id", userController.getUserById);

module.exports = router;
