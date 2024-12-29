const { badRequest } = require('@hapi/boom');

module.exports = {
  validatorHandler(reqSchemas) {
    return function (req, res, next) {
      for (let field of Object.keys(reqSchemas)) {
        const { error } = reqSchemas[field].validate(req[field]);
        if (error) {
          return next(badRequest(error));
        }
      }
      next();
    };
  },
};
