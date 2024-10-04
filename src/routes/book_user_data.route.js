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
// const { auth0Check } = require('../middleware/auth.handler');
const UserBookDataRouter = Router();

UserBookDataRouter.get('/', [validatorHandler(findAllDto)], findAllUserBookData);
UserBookDataRouter.get('/:id', [validatorHandler(findOneDto)], findUserBookData);
UserBookDataRouter.post(
  '/',
  [validatorHandler(createUserBookDataDto)],
  createUserBookData,
);
UserBookDataRouter.put(
  '/:id',
  [validatorHandler(updateUserBookDataDto)],
  updateUserBookData,
);
UserBookDataRouter.delete(
  '/:id',
  [validatorHandler(findOneDto)],
  deleteUserBookData,
);

module.exports = UserBookDataRouter;
