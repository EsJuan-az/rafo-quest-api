const { Router } = require("express");
const {
  findAllUser,
  createUser,
  findUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const UserRouter = Router();

UserRouter.get("/", findAllUser);
UserRouter.get("/:id", findUser);
UserRouter.post("/", createUser);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

module.exports = UserRouter;
