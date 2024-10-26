const { Router } = require("express");
const router = Router({ mergeParams: true });
const commentController = require("../controllers/commentController");

router.get("/", commentController.getAllComments);
router.post("/", commentController.createComment);

module.exports = router;
