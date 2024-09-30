const Joi = require("joi");

module.exports = {
  findOneDto: {
    params: {
      id: Joi.string().required(),
    }
  },
  findAllDto: {
    query: {
      offset: Joi.number().integer().optional(),
      limit: Joi.number().integer().optional()
    }
  }
}