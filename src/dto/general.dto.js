const Joi = require('joi');

module.exports = {
  findOneDto: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  findAllDto: {
    query: Joi.object({
      offset: Joi.number().integer().optional(),
      limit: Joi.number().integer().optional(),
    }),
  },
};
