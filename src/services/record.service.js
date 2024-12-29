const {
  models: { Record },
} = require('../libs/sequelize');
const { notFound } = require('@hapi/boom');
const UserBookDataService = require('./user_book_data.service');
const UserService = require('./user.service');
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
  static async findOne(id) {
    const result = await Record.findOne({
      where: {
        id,
      },
      includes: ['book', 'user'],
    });
    if (!result) {
      throw notFound('record not found');
    }
    return result;
  }
  static async findMany(userId, bookId) {
    const result = await Record.findOne({
      where: {
        userId,
        bookId,
      },
      includes: ['book', 'user'],
    });
    if (!result) {
      throw notFound('record not found');
    }
    return result;
  }
  static async create(userId, record) {
    let ubd = null;
    if (record.currentPage) {
      ubd = await UserBookDataService.update(userId, record.bookId, record);
    } else {
      ubd = await UserBookDataService.incrementCurrentPage(
        userId,
        record.bookId,
        record.pagesRead,
      );
    }
    const cbd = await UserService.findOne(userId);
    const result = await Record.create({ userId, ...record });
    return { Record: result, UserBookData: ubd, User: cbd };
  }
  static async update(id, record) {
    const old = await RecordService.findOne(id);
    const result = await old.update(record, { new: true });
    return result;
  }
  static async delete(id) {
    const result = await RecordService.findOne(id);
    result.destroy();
    return result;
  }
}
module.exports = RecordService;
