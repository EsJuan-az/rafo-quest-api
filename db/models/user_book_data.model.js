const { Model, DataTypes } = require('sequelize');
const { table: BOOK_TABLE } = require('./book.model');
const { table: USER_TABLE } = require('./user.model');
const USER_BOOK_DATA_TABLE = 'user_book_data';
const userBookDataSchema = {
  bookId: {
    field: 'book_id',
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: true,
    references: {
      model: BOOK_TABLE,
      key: 'id',
    },
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
  },
  totalPages: {
    field: 'total_pages',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in process', 'finished'),
    defaultValue: 'pending',
  },
  stars: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  reviewTitle: {
    field: 'review_title',
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewText: {
    field: 'review_text',
    type: DataTypes.STRING,
    allowNull: true,
  },
};
class UserBookData extends Model {
  static associate(models) {
    // USER_BOOK_DATA_TABLE pertenece a un usuario
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    // USER_BOOK_DATA_TABLE pertenece a un libro
    this.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_BOOK_DATA_TABLE,
      timestamps: true,
      modelName: 'UserBookData',
    };
  }
}

module.exports = {
  model: UserBookData,
  table: USER_BOOK_DATA_TABLE,
  schema: userBookDataSchema,
};
