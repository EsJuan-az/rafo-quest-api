const { Router } = require('express');
const {
  findAllRecord,
  createRecord,
  findRecord,
  deleteRecord,
  updateRecord,
} = require('../controllers/record.controller');
const { validatorHandler } = require('../middleware/validate.handler');
const { findAllDto, findOneDto } = require('../dto/general.dto');
const {
  createRecordDto,
  updateRecordDto,
  //   findOrCreateByAuth0Dto,
} = require('../dto/record.dto');
// const { auth0Check } = require('../middleware/auth.handler');
const RecordsRouter = Router();

RecordsRouter.get('/', [validatorHandler(findAllDto)], findAllRecord);
RecordsRouter.get('/:id', [validatorHandler(findOneDto)], findRecord);
RecordsRouter.post('/', [validatorHandler(createRecordDto)], createRecord);
RecordsRouter.put('/:id', [validatorHandler(updateRecordDto)], updateRecord);
RecordsRouter.delete('/:id', [validatorHandler(findOneDto)], deleteRecord);

module.exports = RecordsRouter;
