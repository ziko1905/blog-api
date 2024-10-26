const { Router } = require("express");
const commentRouter = require("./commentRouter");
const postController = require("../controllers/postController");
const queries = require("../db/queries");
const router = Router();

// How much posts, all...(for endpoint when testing requests), could be specified by queries, for pagination
router.get("/", postController.allPostsGet);
router.post("/", postController.createPost);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
