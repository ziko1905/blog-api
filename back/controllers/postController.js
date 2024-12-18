const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");
const queries = require("../db/queries");
const { format } = require("date-fns");
const isAuthor = require("../middleware/isAuthor");
const passport = require("passport");

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title can't be empty!")
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

module.exports.getUserPrivatePosts = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    const posts = await queries.getPostsByUsername(req.user.username, false);
    res.send(
      posts.map((post) => {
        const tmp = format(post.creationTime, "do 'of' MMM, y");
        post.creationTime = tmp;
        return post;
      })
    );
  }),
];

module.exports.singlePostGet = asyncHandler(async (req, res) => {
  res.send(await queries.getPostById(+req.params.postId));
});

module.exports.createPost = [
  passport.authenticate("jwt", { session: false }),
  validatePost,
  validationMiddleware,
  asyncHandler(async (req, res) => {
    const post = await queries.createPost(
      req.body.title,
      req.body.content,
      req.user.username,
      // Published might be unidentified in which case default value is used
      req.body.published
    );
    res.send({ redirect: `${req.baseUrl}/${post.id}` });
  }),
];

module.exports.updatePost = [
  passport.authenticate("jwt", { session: false }),
  isAuthor.post,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title can't be empty!")
      .isLength({ max: 255 })
      .custom(async (value, { req }) => {
        if (
          await queries.findPostByTitleExceptSelf(value, +req.params.postId)
        ) {
          throw new Error("Post with this title already exists");
        }
      }),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Post content can't be empty"),
  ],
  validationMiddleware,
  asyncHandler(async (req, res) => {
    const postId = +req.params.postId;
    const post = await queries.updatePost(
      postId,
      req.body.title,
      req.body.content,
      req.body.published
    );
    res.send(post);
  }),
];

module.exports.publishPost = [
  passport.authenticate("jwt", { session: false }),
  isAuthor.post,
  asyncHandler(async (req, res) => {
    const postId = +req.params.postId;
    const post = await queries.updatePost(
      postId,
      // title and body will always be unidentified
      req.body.title,
      req.body.content,
      req.body.published
    );
    res.send(post);
  }),
];

module.exports.deletePost = [
  passport.authenticate("jwt", { session: false }),
  isAuthor.post,
  asyncHandler(async (req, res) => {
    const postId = +req.params.postId;
    await queries.deletePost(+postId);
    res.status(200).send();
  }),
];
