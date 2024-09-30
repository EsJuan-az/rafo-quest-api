const { Router } = require("express");
const {
  findAllUser,
  createUser,
  findUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const {validatorHandler} = require("../middleware/validate.handler");
const { findAllDto, findOneDto } = require("../dto/general.dto");
const { createUserDto, updateUserDto } = require("../dto/user.dto");
const UserRouter = Router();

UserRouter.get("/", [validatorHandler(findAllDto)], findAllUser);
UserRouter.get("/:id", [validatorHandler(findOneDto)], findUser);
UserRouter.post("/", [validatorHandler(createUserDto)], createUser);
UserRouter.put("/:id", [validatorHandler(updateUserDto)], updateUser);
UserRouter.delete("/:id", [validatorHandler(findOneDto)], deleteUser);

module.exports = UserRouter;
