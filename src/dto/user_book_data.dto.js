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
      status: Joi.string()
        .valid('pending', 'in process', 'finished')
        .optional(),
      stars: Joi.number().optional(),
      reviewTitle: Joi.string().optional(),
      reviewText: Joi.string().optional(),
    }),
  },
};
