const UserService = require('../services/user.service');
const { success } = require('../utils/response');

module.exports = {
  async findAllUser(req, res, next) {
    const { offset = 0, limit = 10 } = req.query;
    try {
      const resp = await UserService.findAll(offset, limit);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findUser(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await UserService.findOne(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findOrCreateByAuth0(req, res, next) {
    const { auth0Id } = req.params;
    const { body: userData } = req;
    try {
      const resp = await UserService.findOrCreateByAuth0Id(auth0Id, userData);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async createUser(req, res, next) {
    try {
      const resp = await UserService.create(req.body);
      return success(req, res, 201, resp);
    } catch (err) {
      next(err);
    }
  },
  async updateUser(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await UserService.update(id, req.body);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await UserService.delete(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
};
