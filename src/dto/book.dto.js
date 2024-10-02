const Joi = require('joi');

module.exports = {
  createBookDto: {
    body: Joi.object({
      name: Joi.string().required(),
      // In case of trophyType to be canon, sortIndex is required, otherwise forbidden.
      trophyType: Joi.string().valid('nini', 'canon', 'bonus').required(),
      sortIndex: Joi.number().integer().optional(),
      cover: Joi.string().uri().required(),
      landscape: Joi.string().uri().required(),
    }),
  },
  updateBookDto: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      trophyType: Joi.string().valid('nini', 'canon', 'bonus').optional(),
      sortIndex: Joi.number().integer().optional(),
      cover: Joi.string().uri().optional(),
      landscape: Joi.string().uri().optional(),
    }),
  },
};
