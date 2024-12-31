const { notFound } = require('@hapi/boom');
const {
  models: { Book, UserBookData },
} = require('../libs/sequelize');
const ThirdPartyService = require('./third_party.service');
class BookService {
  static async findAll(userId, offset, limit) {
    const { rows, count } = await Book.findAndCountAll({
      offset: offset * limit,
      limit,
      order: ['sortIndex'],
      include: [
        {
          model: UserBookData, // Modelo de la tabla intermedia
          as: 'userData', // Alias definido en la relación del modelo
          where: { userId }, // Filtro para el userId específico
          required: false, // Incluye libros aunque no tengan relación
        },
      ],
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
    const placeholder = 'https://covers.openlibrary.org/b/id/10909258-L.jpg';
    if (!book.cover) {
      const volumes = await ThirdPartyService.getVolumes(book.name);
      if (volumes.length > 0) {
        book.cover =
          volumes[0]?.volumeInfo?.imageLinks?.thumbnail || placeholder;
      } else {
        book.cover = placeholder;
      }
    }

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
