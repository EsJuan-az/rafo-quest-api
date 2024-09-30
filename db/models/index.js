/**
 * db/models/index.js
 * This file exports a function that, given a sequelize instance,
 * embed every model on it.
 */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);

function getAllModels() {
  return fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    })
    .map((file) => require(path.join(__dirname, file)));
}

function defineModels(sequelize) {
  let db = {
    models: {},
    sequelize,
    Sequelize,
  };
  getAllModels().forEach(({ model, schema }) => {
    const config = model.config(sequelize);
    model.init(schema, config);
    db.models[config.modelName] = model;
  });
  Object.keys(db.models).forEach((modelName) => {
    const model = db.models[modelName];
    if (typeof model.associate === 'function') {
      model.associate(db.models);
    }
  });
  return db;
}

module.exports = {
  defineModels,
};
