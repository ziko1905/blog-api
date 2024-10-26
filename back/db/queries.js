const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const { PostNotFound } = require("../errors");

// Testing purposes, acts like connect or create
module.exports.createTest = async () =>
  await client.user.upsert({
    where: {
      username: "TU1",
    },
    create: {
      username: "TU1",
      email: "TU1@gmail.com",
      password: "gibberish",
    },
    update: {},
  });

async function getAllPosts() {
  return await client.post.findMany();
}

async function createPost(title, content, username) {
  return await client.post.create({
    data: {
      title: title,
      content: content,
      User: {
        connect: {
          username: username,
        },
      },
    },
  });
}

async function updatePost(postId, title, content) {
  return await client.post.update({
    where: {
      id: postId,
    },

    data: {
      title: title,
      content: content,
    },
  });
}

async function deletePost(postId) {
  try {
    return await client.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (err) {
    console.log(err);
    throw new PostNotFound("Could't find post to delete");
  }
}

async function findPostByTitle(title) {
  return await client.post.findFirst({
    where: {
      title,
    },
  });
}

async function getAllComments(postId) {
  try {
    return client.comment.findMany({
      where: {
        postId: postId,
      },
    });
  } catch (err) {
    console.log(err);
    // Not sure if needed bcs of how API will be used
    throw new PostNotFound("Couldn't find post.");
  }
}

async function createComment(postId, username, content) {
  try {
    return await client.comment.create({
      data: {
        content: content,
        userName: username,
        postId: postId,
      },
    });
  } catch (err) {
    console.log(err);
    // Not sure if needed bcs of how API will be used
    throw new PostNotFound("Couldn't find post to add comment to.");
  }
}

module.exports = {
  ...module.exports,
  getAllPosts,
  createPost,
  updatePost,
  findPostByTitle,
  deletePost,
  getAllComments,
  createComment,
};
