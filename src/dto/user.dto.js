const Joi = require('joi');

module.exports = {
  createUserDto: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      auth0Id: Joi.string().required(),
      avatar: Joi.string().uri().required(),
    }),
  },
  updateUserDto: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(3).optional(),
      auth0Id: Joi.string().optional(),
      avatar: Joi.string().uri().optional(),
    }),
  },
  // TODO: Either name and avatar come together, or they don't come.
  findOrCreateByAuth0Dto: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      avatar: Joi.string().uri().required(),
    }),
  },
};
