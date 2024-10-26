const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

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
          where: {
            username: username,
          },
        },
      },
    },
  });
}

module.exports = {
  ...module.exports,
  getAllPosts,
  createPost,
};
