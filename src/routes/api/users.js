const { Router } = require("express");
const route = Router();
const { createUser, verifyUser } = require("../../controller/user");

route.post("/", async (req, res) => {
  const createdUser = await createUser(req.body.user);
  res.send(createdUser);
});

route.post("/login", async (req, res) => {
  const user = await verifyUser(req.body.user);
  res.send(user);
});

module.exports = route;
