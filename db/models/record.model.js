const { Model, DataTypes } = require('sequelize');
const { table: BOOK_TABLE } = require('./book.model');
const { table: USER_TABLE } = require('./user.model');
const RECORDS_TABLE = 'records';
const recordsSchema = {
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
  },
  pagesRead: {
    field: 'pages_read',
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
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
};
class Record extends Model {
  static associate(models) {
    // records pertenece a un usuario
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    // records pertenece a un libro
    this.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RECORDS_TABLE,
      timestamps: true,
      modelName: 'Records',
    };
  }
}

module.exports = {
  model: Record,
  table: RECORDS_TABLE,
  schema: recordsSchema,
};
