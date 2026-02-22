const {Sequelize} = require('sequelize');
const todoModel = require('./models/todo');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // cleaner logs in prod
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  }
);
const Todo = todoModel(sequelize, Sequelize)
module.exports = {sequelize, Sequelize, Todo};