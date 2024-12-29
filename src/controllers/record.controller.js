const RecordService = require('../services/record.service');
const { success } = require('../utils/response');

module.exports = {
  async findAllRecord(req, res, next) {
    const { offset = 0, limit = 10 } = req.query;
    const userId = req.user.id;
    try {
      const resp = await RecordService.findAll(userId, offset, limit);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findRecords(req, res, next) {
    const { bookId } = req.params;
    const userId = req.user.id;
    try {
      const resp = await RecordService.findMany(userId, bookId);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async createRecord(req, res, next) {
    const userId = req.user.id;
    const bookId = req.user.currentBook.id;
    try {
      const resp = await RecordService.create(userId, { ...req.body, bookId });
      return success(req, res, 201, resp);
    } catch (err) {
      next(err);
    }
  },
  async updateRecord(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await RecordService.update(id, req.body);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async deleteRecord(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await RecordService.delete(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
};
