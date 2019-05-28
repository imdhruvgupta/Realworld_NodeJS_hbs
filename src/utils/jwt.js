const jwt = require("jsonwebtoken");

const secret = "huehudekjdbBBdebhdbekb13hjhbejh3bfrf";

async function createToken(user) {
  const token = await jwt.sign(user, secret);
  return token;
}

async function verifyToken(token) {
  const user = await jwt.verify(token, secret);
  return user;
}

module.exports = {
  createToken,
  verifyToken
};
