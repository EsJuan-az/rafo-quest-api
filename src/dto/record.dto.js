const Joi = require('joi');

module.exports = {
  createRecordDto: {
    body: Joi.object({
      pagesRead: Joi.number().integer().required(),
      bookId: Joi.string().required(),
      // TODO: Obtener user con Auth0.
    }),
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
