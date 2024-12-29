const { Model, DataTypes } = require('sequelize');

const BOOK_TABLE = 'books';
const bookSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sortIndex: {
    field: 'sort_index',
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
class Book extends Model {
  static associate(models) {
    this.hasMany(models.UserBookData, {
      as: 'userData',
      foreignKey: 'bookId',
    });
    this.belongsToMany(models.User, {
      as: 'users',
      through: models.UserBookData,
      otherKey: 'userId',
      foreignKey: 'bookId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOK_TABLE,
      timestamps: true,
      modelName: 'Book',
    };
  }
}

module.exports = {
  model: Book,
  table: BOOK_TABLE,
  schema: bookSchema,
};
