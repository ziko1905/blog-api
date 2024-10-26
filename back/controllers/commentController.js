const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

module.exports.getAllComments = asyncHandler(async (req, res) => {
  res.send(await queries.getAllComments());
});
