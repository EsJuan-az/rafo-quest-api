const { notFound } = require('@hapi/boom');
const {
  models: { Book },
} = require('../libs/sequelize');
class BookService {
  static async findAll(offset, limit) {
    const { rows, count } = await Book.findAndCountAll({
      offset: offset * limit,
      limit,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      rows,
      totalItems: count,
      currentPage: offset,
      totalPages,
    };
  }
  static async findOne(id) {
    const result = await Book.findOne({
      where: {
        id,
      },
    });
    if (!result) {
      throw notFound('book not found');
    }
    return result;
  }
  static async create(book) {
    const result = await Book.create(book);
    return result;
  }
  static async update(id, book) {
    const old = await BookService.findOne(id);
    const result = await old.update(book, { new: true });
    return result;
  }
  static async delete(id) {
    const result = await BookService.findOne(id);
    result.destroy();
    return result;
  }
}
module.exports = BookService;
