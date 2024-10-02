const { Router } = require('express');
const {
  findAllUser,
  createUser,
  findUser,
  deleteUser,
  updateUser,
  findOrCreateByAuth0,
} = require('../controllers/user.controller');
const { validatorHandler } = require('../middleware/validate.handler');
const { findAllDto, findOneDto } = require('../dto/general.dto');
const {
  createUserDto,
  updateUserDto,
  findOrCreateByAuth0Dto,
} = require('../dto/user.dto');
const { auth0Check } = require('../middleware/auth.handler');
const UserRouter = Router();

UserRouter.get('/', [validatorHandler(findAllDto)], findAllUser);
UserRouter.get('/:id', [validatorHandler(findOneDto)], findUser);
UserRouter.post(
  '/auth/:auth0Id',
  [auth0Check, validatorHandler(findOrCreateByAuth0Dto)],
  findOrCreateByAuth0,
);
UserRouter.post('/', [validatorHandler(createUserDto)], createUser);
UserRouter.put('/:id', [validatorHandler(updateUserDto)], updateUser);
UserRouter.delete('/:id', [validatorHandler(findOneDto)], deleteUser);

module.exports = UserRouter;
