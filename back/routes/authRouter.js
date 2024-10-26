const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/signup", authController.signupPost);
router.post("/login", passport.authenticate());

module.exports = router;
