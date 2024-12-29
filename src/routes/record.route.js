const { Router } = require('express');
const {
  findAllRecord,
  createRecord,
  deleteRecord,
  updateRecord,
  findRecords,
} = require('../controllers/record.controller');
const { validatorHandler } = require('../middleware/validate.handler');
const { findAllDto, findOneDto } = require('../dto/general.dto');
const {
  createRecordDto,
  updateRecordDto,
  findRecordsDto,
  //   findOrCreateByAuth0Dto,
} = require('../dto/record.dto');
const { auth0AndAddUser } = require('../middleware/auth.handler');
// const { auth0Check } = require('../middleware/auth.handler');
const RecordsRouter = Router();
RecordsRouter.get(
  '/',
  [auth0AndAddUser, validatorHandler(findAllDto)],
  findAllRecord,
);
RecordsRouter.get(
  '/:bookId',
  [auth0AndAddUser, validatorHandler(findRecordsDto)],
  findRecords,
);
RecordsRouter.post(
  '/',
  [auth0AndAddUser, validatorHandler(createRecordDto)],
  createRecord,
);
RecordsRouter.put(
  '/:id',
  [auth0AndAddUser, validatorHandler(updateRecordDto)],
  updateRecord,
);
RecordsRouter.delete(
  '/:id',
  [auth0AndAddUser, validatorHandler(findOneDto)],
  deleteRecord,
);

module.exports = RecordsRouter;
