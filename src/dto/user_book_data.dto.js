const Joi = require('joi');

module.exports = {
  createUserBookDataDto: {
    body: Joi.object({
      bookId: Joi.string().required(),
      totalPages: Joi.number().integer().required(),
    }),
  },
  updateUserBookDataDto: {
    params: Joi.object({
      bookId: Joi.string().required(),
    }),
    body: Joi.object({
      totalPages: Joi.number().integer().optional(),
      stars: Joi.number().optional(),
      reviewTitle: Joi.string().optional(),
      reviewText: Joi.string().optional(),
    }),
  },
};
