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
      include: [
        {
          association: 'book', // Relación con el libro
        },
        {
          association: 'user', // Relación con el usuario
        },
      ],
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
      include: [
        {
          association: 'book', // Relación con el libro
        },
        {
          association: 'user', // Relación con el usuario
        },
      ],
    });

    if (!result) {
      throw notFound('Book data not found');
    }

    return result;
  }

  static async create(userId, data) {
    data = {
      userId,
      ...data,
    };
    const result = await UserBookData.create(data);
    return result;
  }

  static async update(userId, bookId, userBookData) {
    const old = await UserBookDataService.findOne(userId, bookId);
    const result = await old.update(userBookData, { new: true });
    return result;
  }

  static async incrementCurrentPage(userId, bookId, increment) {
    const ubd = await UserBookDataService.findOne(userId, bookId);

    // Incrementa el currentPage manualmente
    const newCurrentPage = ubd.currentPage + increment;

    // Actualiza la instancia de UserBookData
    await ubd.update({ currentPage: newCurrentPage });

    return await UserBookDataService.findOne(userId, bookId); // Devuelve la instancia actualizada
  }

  static async delete(userId, bookId) {
    const result = await UserBookDataService.findOne(userId, bookId);
    await result.destroy();
    return result;
  }
}

module.exports = UserBookDataService;
