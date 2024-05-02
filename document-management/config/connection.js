
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:PASSWORD@localhost:5432/documentdb');

module.exports = sequelize;
