const { Model, DataTypes } = require("sequelize");

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
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
class User extends Model{
  static associate(models){

  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      timestamps: true,
      modelName: 'User',
    }
  }
}

module.exports = {
  model: User,
  table: USER_TABLE,
  schema: userSchema,
}