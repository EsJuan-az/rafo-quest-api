const { Model, DataTypes } = require("sequelize");

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
  trophyType: {
    field: "trophy_type",
    type: DataTypes.ENUM('nini', 'canon', 'bonus'),
    allowNull: false,
  },
  sortIndex: {
    field: "sort_index",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landscape: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
class Book extends Model{
  static associate(models){

  }
  static config(sequelize){
    return {
      sequelize,
      tableName: BOOK_TABLE,
      timestamps: true,
      modelName: 'Book',
    }
  }
}

module.exports = {
  model: Book,
  table: BOOK_TABLE,
  schema: bookSchema,
}