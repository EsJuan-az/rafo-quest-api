const {
  models: { UserBookData },
} = require('../libs/sequelize');
const { notFound } = require('@hapi/boom');
class UserBookDataService {
  static async findAll(userId, offset, limit) {
    const result = await UserBookData.findAll({
      where: {
        userId,
      },
      includes: ['book', 'user'],
      offset,
      limit,
    });
    return result;
  }
  static async findOne(userId, bookId) {
    const result = await UserBookData.findOne({
      where: {
        userId,
        bookId,
      },
      includes: ['book', 'user'],
    });
    if (!result) {
      throw notFound('book data not found');
    }
    return result;
  }
  static async create(userId, data) {
    console.log(data);
    const result = await UserBookData.create({ userId, ...data });
    return result;
  }
  static async update(userId, bookId, userBookData) {
    const old = await UserBookDataService.findOne(userId, bookId);
    const result = await old.update(userBookData, { new: true });
    return result;
  }
  static async delete(userId, bookId) {
    const result = await UserBookDataService.findOne(userId, bookId);
    result.destroy();
    return result;
  }
}
module.exports = UserBookDataService;
