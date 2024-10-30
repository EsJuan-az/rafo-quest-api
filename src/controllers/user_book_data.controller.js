const UserBookDataService = require('../services/user_book_data.service');
const { success } = require('../utils/response');

module.exports = {
  async findAllUserBookData(req, res, next) {
    const userId = req.user.id;
    const { offset = 0, limit = 10 } = req.query;
    try {
      const resp = await UserBookDataService.findAll(userId, offset, limit);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findUserBookData(req, res, next) {
    const userId = req.user.id;
    const { bookId } = req.params;
    try {
      const resp = await UserBookDataService.findOne(userId, bookId);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async createUserBookData(req, res, next) {
    const userId = req.user.id;
    try {
      const resp = await UserBookDataService.create(userId, req.body);
      return success(req, res, 201, resp);
    } catch (err) {
      next(err);
    }
  },
  async updateUserBookData(req, res, next) {
    const userId = req.user.id;
    const { bookId } = req.params;
    try {
      const resp = await UserBookDataService.update(userId, bookId, req.body);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async deleteUserBookData(req, res, next) {
    const userId = req.user.id;
    const { bookId } = req.params;
    try {
      const resp = await UserBookDataService.delete(userId, bookId);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
};
