const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");

validateComment = [
  body("content").trim().notEmpty().withMessage("Comment can't be empty"),
];

module.exports.getAllComments = asyncHandler(async (req, res) => {
  res.send(await queries.getAllComments(+req.params.postId));
});

module.exports.createComment = [
  validateComment,
  validationMiddleware,
  asyncHandler(async (req, res) => {
    return res.send(
      await queries.createComment(
        +req.params.postId,
        req.user.username,
        req.body.content
      )
    );
  }),
];
