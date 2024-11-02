const queries = require("../db/queries");
const asyncHandler = require("express-async-handler");

module.exports.comment = asyncHandler(async (req, res, next) => {
  if (
    !(
      (await queries.isCommentAuthor(
        +req.params.commentId,
        req.user.username
      )) || (await queries.isPostAuthor(+req.params.postId, req.user.username))
    )
  ) {
    return res.send({
      messages: "You are not authorized to act upon this comment.",
    });
  }
  next();
});

module.exports.post = asyncHandler(async (req, res, next) => {
  if (!(await queries.isPostAuthor(+req.params.postId, req.user.username))) {
    return res.send({
      messages: "You are not authorized to act upon this post.",
    });
  }
  next();
});
