const express = require("express");
<<<<<<< HEAD

const router = express.Router();

=======
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

>>>>>>> 61b49750ddb5fa72faa82fc68574218d7343849f
module.exports = router;
