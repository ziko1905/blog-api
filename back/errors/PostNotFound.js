class PostNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "PostNotFound";
  }
}

module.exports = PostNotFound;
