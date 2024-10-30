'use strict';

const { DataTypes, Sequelize } = require('sequelize');

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
  color: {
    type: DataTypes.STRING,
    defaultValue: '#fff',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
};

const bookSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trophyType: {
    field: 'trophy_type',
    type: DataTypes.ENUM('nini', 'canon', 'bonus'),
    allowNull: false,
  },
  sortIndex: {
    field: 'sort_index',
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  resourceName: {
    field: 'resource_name',
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
};

const userBookDataSchema = {
  bookId: {
    field: 'book_id',
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'books',
      key: 'id',
    },
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'users',
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', userSchema);
    await queryInterface.createTable('books', bookSchema);
    await queryInterface.createTable('user_book_data', userBookDataSchema);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user_book_data');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('users');
  },
};
