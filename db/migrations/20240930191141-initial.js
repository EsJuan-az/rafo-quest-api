'use strict';

const { DataTypes, Sequelize } = require('sequelize');

// User schema
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

// Book schema
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
  sortIndex: {
    field: 'sort_index',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
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

// UserBookData schema
const userBookDataSchema = {
  bookId: {
    field: 'book_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id',
    },
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  currentPage: {
    field: 'current_page',
    type: DataTypes.INTEGER,
    defaultValue: 0,
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

// Records schema
const recordsSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    references: {
      model: 'books',
      key: 'id',
    },
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', userSchema);
    await queryInterface.createTable('books', bookSchema);
    await queryInterface.createTable('user_book_data', userBookDataSchema);
    await queryInterface.createTable('records', recordsSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('records');
    await queryInterface.dropTable('user_book_data');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('users');
  },
};
