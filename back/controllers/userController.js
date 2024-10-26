const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

module.exports.getUser = asyncHandler(async (req, res) => {
  // Might want to change what is being sent(etc. when user being searched doesn't want other user to see his email)
  return res.send(await queries.getUserByUsername(req.params.username));
});

module.exports.getUsersPosts = asyncHandler(async (req, res) => {
  const allPosts = await queries.getPostsByUsername(req.params.username);
  //   Waiting for is published column is added to user model schema
  return res.send(allPosts);
});
