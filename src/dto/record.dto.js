const Joi = require('joi');

module.exports = {
  findRecordsDto: {
    params: Joi.object({
      bookId: Joi.string().required(),
    }),
  },
  createRecordDto: {
    body: Joi.object({
      pagesRead: Joi.number().integer().optional(),
      currentPage: Joi.number().integer().optional(),
      // TODO: Obtener user con Auth0.
    }).xor('pagesRead', 'currentPage'),
  },
  updateRecordDto: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      pagesRead: Joi.number().integer().optional(),
    }),
  },
};
