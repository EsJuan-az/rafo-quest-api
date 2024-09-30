const Joi = require("joi");

module.exports = {
  createUserDto: {
    body: {
      name: Joi.string().min(3).required(),
      auth0Id: Joi.string().required(),
      avatar: Joi.string().uri().required(),
    }
  },
  updateUserDto: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().min(3).optional(),
      auth0Id: Joi.string().optional(),
      avatar: Joi.string().uri().optional(),
    }
  }
}