const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signupPost);

module.exports = router;
