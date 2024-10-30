const { Router } = require('express');
const {
  findAllUserBookData,
  createUserBookData,
  findUserBookData,
  deleteUserBookData,
  updateUserBookData,
} = require('../controllers/user_book_data.controller');
const { validatorHandler } = require('../middleware/validate.handler');
const { findAllDto, findOneDto } = require('../dto/general.dto');
const {
  createUserBookDataDto,
  updateUserBookDataDto,
  //   findOrCreateByAuth0Dto,
} = require('../dto/user_book_data.dto');
const { auth0AndAddUser } = require('../middleware/auth.handler');
// const { auth0Check } = require('../middleware/auth.handler');
const UserBookDataRouter = Router();

UserBookDataRouter.get(
  '/',
  [auth0AndAddUser, validatorHandler(findAllDto)],
  findAllUserBookData,
);
UserBookDataRouter.get(
  '/:bookId',
  [auth0AndAddUser, validatorHandler(findOneDto)],
  findUserBookData,
);
UserBookDataRouter.post(
  '/',
  [auth0AndAddUser, validatorHandler(createUserBookDataDto)],
  createUserBookData,
);
UserBookDataRouter.put(
  '/:bookId',
  [auth0AndAddUser, validatorHandler(updateUserBookDataDto)],
  updateUserBookData,
);
UserBookDataRouter.delete(
  '/:bookId',
  [auth0AndAddUser, validatorHandler(findOneDto)],
  deleteUserBookData,
);

module.exports = UserBookDataRouter;
