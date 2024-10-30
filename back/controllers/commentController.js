const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");
const isAuthor = require("../middleware/isAuthor");

validateComment = [
  body("content").trim().notEmpty().withMessage("Comment can't be empty"),
];

module.exports.getAllComments = asyncHandler(async (req, res) => {
  res.send(await queries.getAllComments(+req.params.postId));
});

module.exports.createComment = [
  passport.authenticate("jwt", { session: false }),
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

module.exports.updateComment = [
  passport.authenticate("jwt", { session: false }),
  isAuthor.comment,
  validateComment,
  validationMiddleware,
  asyncHandler(async (req, res) => {
    return res.send(
      await queries.updateComment(+req.params.commentId, req.body.content)
    );
  }),
];

module.exports.deleteComment = [
  passport.authenticate("jwt", { session: false }),
  isAuthor.comment,
  asyncHandler(async (req, res) => {
    res.send(await queries.deleteComment(+req.params.commentId));
  }),
];
