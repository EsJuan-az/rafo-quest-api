const {
  models: { Record },
} = require('../libs/sequelize');
const { notFound } = require('@hapi/boom');
class RecordService {
  static async findAll(userId, offset, limit) {
    const result = await Record.findAll({
      where: {
        userId,
      },
      includes: ['book', 'user'],
      offset,
      limit,
    });
    return result;
  }
  static async findOne(userId, id) {
    const result = await Record.findOne({
      where: {
        userId,
        id,
      },
      includes: ['book', 'user'],
    });
    if (!result) {
      throw notFound('record not found');
    }
    return result;
  }
  static async create(userId, record) {
    const result = await Record.create({ userId, ...record });
    return result;
  }
  static async update(userId, id, record) {
    const old = await RecordService.findOne(userId, id);
    const result = await old.update(record, { new: true });
    return result;
  }
  static async delete(userId, id) {
    const result = await RecordService.findOne(userId, id);
    result.destroy();
    return result;
  }
}
module.exports = RecordService;
