const UserBookDataService = require('../services/user_book_data.service');
const { success } = require('../utils/response');

module.exports = {
  async findAllUserBookData(req, res, next) {
    const { offset = 0, limit = 10 } = req.query;
    try {
      const resp = await UserBookDataService.findAll(offset, limit);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findUserBookData(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await UserBookDataService.findOne(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async createUserBookData(req, res, next) {
    try {
      const resp = await UserBookDataService.create(req.body);
      return success(req, res, 201, resp);
    } catch (err) {
      next(err);
    }
  },
  async updateUserBookData(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await UserBookDataService.update(id, req.body);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async deleteUserBookData(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await UserBookDataService.delete(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
};
