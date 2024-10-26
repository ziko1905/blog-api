const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const { CustomNotFound } = require("../errors");

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

async function getUserByUsername(username) {
  try {
    return client.user.findFirst({
      where: {
        username: username,
      },
    });
  } catch (err) {
    console.log(err);
    throw new CustomNotFound(`Couldn't find user with ${username} username.`);
  }
}

async function getPostsByUsername(username) {
  try {
    return client.post.findMany({
      where: {
        userName: username,
      },
    });
  } catch (err) {
    console.log(err);
    throw new CustomNotFound(`Couldn't find user posts of ${username}.`);
  }
}

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
  try {
    return await client.post.update({
      where: {
        id: postId,
      },

      data: {
        title: title,
        content: content,
      },
    });
  } catch (err) {
    console.log(err);
    throw new CustomNotFound("Couldn't find post to update.");
  }
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
    throw new CustomNotFound("Could't find post to delete");
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
    throw new CustomNotFound("Couldn't find post.");
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
    throw new CustomNotFound("Couldn't find post to add comment to.");
  }
}

async function updateComment(commentId, content) {
  try {
    return await client.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
      },
    });
  } catch (err) {
    console.log(err);
    // Not sure if needed bcs of how API will be used
    throw new CustomNotFound("Couldn't find comment to update.");
  }
}

async function deleteComment(commentId) {
  try {
    return client.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (err) {
    console.log(err);
    throw new CustomNotFound("Couldn't find comment to delete.");
  }
}

module.exports = {
  ...module.exports,
  getUserByUsername,
  getPostsByUsername,
  getAllPosts,
  createPost,
  updatePost,
  findPostByTitle,
  deletePost,
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
