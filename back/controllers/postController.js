const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware.js");
const queries = require("../db/queries");
const { format } = require("date-fns");

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Cant be empty!")
    .isLength({ max: 255 })
    .custom(async (value) => {
      if (await queries.findPostByTitle(value)) {
        throw new Error("Post with this title already exists");
      }
    }),
  body("content").trim().notEmpty().withMessage("Post content can't be empty"),
];

module.exports.allPostsGet = asyncHandler(async (req, res) => {
  const posts = await queries.getAllPosts();
  res.send(
    posts.map((post) => {
      post.creationTime = format(new Date(post.creationTime), "do 'of' MMM, y");
      return post;
    })
  );
});

module.exports.singlePostGet = asyncHandler(async (req, res) => {
  res.send(await queries.getPostById(+req.params.postId));
});

module.exports.createPost = [
  validatePost,
  validationMiddleware,
  asyncHandler(async (req, res) => {
    const post = await queries.createPost(
      req.body.title,
      req.body.content,
      req.user.username
    );
    res.send({ redirect: `${req.baseUrl}/${post.id}` });
  }),
];

module.exports.updatePost = [
  validatePost,
  validationMiddleware,
  asyncHandler(async (req, res) => {
    const postId = +req.params.postId;
    const post = await queries.updatePost(
      postId,
      req.body.title,
      req.body.content
    );
    res.send(post);
  }),
];

module.exports.deletePost = asyncHandler(async (req, res) => {
  const postId = +req.params.postId;
  await queries.deletePost(postId);
  res.send({ redirect: "/posts" });
});
