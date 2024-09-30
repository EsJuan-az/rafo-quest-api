const Joi = require("joi");

module.exports = {
  createBookDto: {
    body: {
      name: Joi.string().required(),
      trophyType: Joi.string().valid('nini', 'canon', 'bonus').required(),
      sortIndex: Joi.number().required(),
      cover: Joi.string().uri().required(),
      landscape: Joi.string().uri().required(),
    }
  },
  updateBookDto: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().optional(),
      trophyType: Joi.string().valid('nini', 'canon', 'bonus').required(),
      sortIndex: Joi.number().required(),
      cover: Joi.string().uri().required(),
      landscape: Joi.string().uri().required(),
    }
  }
}