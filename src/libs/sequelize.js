const { Sequelize } = require('sequelize');
const { sequelizeConfig, NODE_ENV } = require('../../config');
const { defineModels } = require('../../db/models');
const envSequelizeConfig = sequelizeConfig[NODE_ENV];
const sequelize = new Sequelize(envSequelizeConfig.url, envSequelizeConfig);

module.exports = defineModels(sequelize);
