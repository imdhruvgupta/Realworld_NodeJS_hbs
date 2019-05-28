const { Users } = require("../models");
const { createToken } = require("../utils/jwt");

async function createUser(userOpts) {
  if (!userOpts.username) {
    throw new Error("Did not supply username");
  }
  if (!userOpts.email) {
    throw new Error("Did not supply email");
  }
  if (!userOpts.password) {
    throw new Error("Did not supply password");
  }

  const user = await Users.create({
    ...userOpts
  });

  if (!user) {
    throw new Error("Error creating user");
  }

  return {
    user
  };
}

async function verifyUser(userOpts) {
  if (!userOpts.email) {
    throw new Error("Did not supply email");
  }
  if (!userOpts.password) {
    throw new Error("Did not supply password");
  }

  const user = await Users.findOne({
    where: {
      email: userOpts.email
    }
  });

  console.log(user.get());
  if (!user) {
    throw new Error("Email not registered");
  }
  if (user.password !== userOpts.password) {
    throw new Error("Password does not match");
  }

  const createdUser = await Users.findOne({
    attributes: ["username", "email", "bio", "image"],
    where: {
      email: userOpts.email
    }
  });

  const token = await createToken(createdUser.get());

  return {
    createdUser,
    token
  };
}

module.exports = {
  createUser,
  verifyUser
};
