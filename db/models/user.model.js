const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const userSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  auth0Id: {
    field: 'auth0_id',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentBook: {
    type: DataTypes.VIRTUAL,
    get() {
      // Obtener los datos del libro del usuario
      const userBooks = this.getDataValue('bookData') || [];

      // Ordenar los libros por sortIndex en orden ascendente
      const sortedBooks = userBooks.sort((a, b) => {
        const sortIndexA = a.sortIndex || 0; // Manejar undefined o null
        const sortIndexB = b.sortIndex || 0;
        return sortIndexA - sortIndexB;
      });

      // Encontrar el primer libro no finalizado
      return (
        sortedBooks.find((book) => book.UserBookData.status !== 'finished') ||
        null
      );
    },
  },
};

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Book, {
      as: 'bookData',
      through: models.UserBookData,
      foreignKey: 'userId',
      otherKey: 'bookId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      timestamps: true,
      modelName: 'User',
    };
  }
}

module.exports = {
  model: User,
  table: USER_TABLE,
  schema: userSchema,
};
