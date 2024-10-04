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
  static async findOne(userId, id) {
    const result = await UserBookData.findOne({
      where: {
        userId,
        id,
      },
      includes: ['book', 'user'],
    });
    if (!result) {
      throw notFound('user_book_data not found');
    }
    return result;
  }
  static async create(userId, userBookData) {
    const result = await UserBookData.create({ userId, ...userBookData });
    return result;
  }
  static async update(userId, id, userBookData) {
    const old = await UserBookDataService.findOne(userId, id);
    const result = await old.update(userBookData, { new: true });
    return result;
  }
  static async delete(userId, id) {
    const result = await UserBookDataService.findOne(userId, id);
    result.destroy();
    return result;
  }
}
module.exports = UserBookDataService;
