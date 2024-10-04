const RecordService = require('../services/record.service');
const { success } = require('../utils/response');

module.exports = {
  async findAllRecord(req, res, next) {
    const { offset = 0, limit = 10 } = req.query;
    try {
      const resp = await RecordService.findAll(offset, limit);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findRecord(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await RecordService.findOne(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async createRecord(req, res, next) {
    try {
      const resp = await RecordService.create(req.body);
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
