const express = require("express");
<<<<<<< HEAD

const router = express.Router();

=======
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUser);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.patch("/deleteMe", authController.protect, userController.deleteMe);

router.get("/:id", userController.getUserById);

>>>>>>> 61b49750ddb5fa72faa82fc68574218d7343849f
module.exports = router;
