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

async function createUser(username, email, password) {
  return await client.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
}

async function getUserByUsername(username) {
  const user = await client.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    throw new CustomNotFound(`Couldn't find user with ${username} username.`);
  }

  return user;
}

async function getUserByUsernameNoThrow(username) {
  const user = await client.user.findFirst({
    where: {
      username: username,
    },
  });

  return user;
}

async function getUserByEmail(email) {
  const user = await client.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new CustomNotFound(`Couldn't find user with ${username} username.`);
  }

  return user;
}

async function userExistsByUsername(username) {
  return !!(await client.user.findFirst({
    where: {
      username: username,
    },
  }));
}

async function userExistsByEmail(email) {
  return !!(await client.user.findFirst({
    where: {
      email: email,
    },
  }));
}

async function getPostsByUsername(username) {
  const user = await client.user.findFirst({
    where: {
      username: username,
    },
    include: {
      posts: true,
    },
  });

  if (!user) {
    throw new CustomNotFound(`Couldn't find user posts of ${username}.`);
  }

  return user.posts;
}

async function getAllPosts() {
  return await client.post.findMany();
}

async function getPostById(postId) {
  post = await client.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (!post) {
    throw new CustomNotFound("Couldn't find post you are looking for.");
  }

  return post;
}

async function createPost(title, content, username, published) {
  return await client.post.create({
    data: {
      title: title,
      content: content,
      published: published,
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
    const deleted = await client.post.delete({
      where: {
        id: postId,
      },
    });
    return deleted;
  } catch (err) {
    console.lof(err);
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
    return await client.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (err) {
    console.log(err);
    throw new CustomNotFound("Couldn't find comment to delete.");
  }
}

async function isCommentAuthor(commentId, username) {
  const commentAuth = await client.user.findFirst({
    where: {
      comments: {
        some: {
          id: commentId,
        },
      },
    },
  });
  return commentAuth.username == username;
}

async function isPostAuthor(postId, username) {
  const postAuth = await client.user.findFirst({
    where: {
      posts: {
        some: {
          id: postId,
        },
      },
    },
  });
  if (!postAuth) {
    throw new CustomNotFound("Couldn't find post to delete");
  }
  return postAuth.username == username;
}

module.exports = {
  ...module.exports,
  createUser,
  getUserByUsername,
  getUserByUsernameNoThrow,
  getUserByEmail,
  userExistsByUsername,
  userExistsByEmail,
  getPostsByUsername,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  findPostByTitle,
  deletePost,
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  isCommentAuthor,
  isPostAuthor,
};
