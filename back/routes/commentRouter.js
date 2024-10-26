const { Router } = require("express");
const router = Router({ mergeParams: true });
const commentController = require("../controllers/commentController");

router.get("/", commentController.getAllComments);

module.exports = router;
