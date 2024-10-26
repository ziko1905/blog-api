const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/:username", userController.getUser);
router.get("/:username/posts", userController.getUsersPosts);

module.exports = router;
