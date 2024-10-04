const Joi = require('joi');

module.exports = {
  createUserBookDataDto: {
    body: Joi.object({
      bookId: Joi.string().required(),
      // userId: Joi.string().required(),
      // TODO: Obtener user con Auth0.
      totalPages: Joi.number().integer().required(),
      finished: Joi.boolean().optional(),
      stars: Joi.number().optional(),
      reviewTitle: Joi.string().optional(),
      reviewText: Joi.string().optional(),
    }),
  },
  updateUserBookDataDto: {
    params: Joi.object({
      // TODO: Obtener user con Auth0.
      bookId: Joi.string().required(),
    }),
    body: Joi.object({
      totalPages: Joi.number().integer().optional(),
      finished: Joi.boolean().optional(),
      stars: Joi.number().optional(),
      reviewTitle: Joi.string().optional(),
      reviewText: Joi.string().optional(),
    }),
  },
};
