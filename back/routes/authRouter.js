const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/logged", authController.getIsLogged);
router.post("/signup", authController.signupPost);
router.post("/login", authController.loginPost);

module.exports = router;
