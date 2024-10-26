const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const queries = require("../db/queries");

module.exports.allPostsGet = asyncHandler(async (req, res) => {
  res.send(await queries.getAllPosts());
});

module.exports.createPostPost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Cant be empty!")
    .isLength({ max: 255 }),
  body("content").trim().notEmpty(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ validationMsgs: errors.array() });
    }

    const post = await queries.createPost(
      req.body.title,
      req.body.content,
      req.user.username
    );
    res.send({ redirect: `${req.originalUrl}/${post.id}` });
  }),
];
