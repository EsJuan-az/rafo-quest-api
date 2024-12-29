const Joi = require('joi');

module.exports = {
  createBookDto: {
    body: Joi.object({
      name: Joi.string().required(),
      sortIndex: Joi.number().integer().required(),
      cover: Joi.string().uri().optional(), // TODO: Bring an image using the name in case its not provided.
    }),
  },
  updateBookDto: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      sortIndex: Joi.number().integer().required(),
      cover: Joi.string().uri().optional(),
    }),
  },
};
