// src/config/config.js
const { Sequelize } = require('sequelize');
const todoModel = require('./models/todo');   // must match folder structure exactly
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: { require: true, rejectUnauthorized: false }
    } : {}
  }
);

// 🔴 CRITICAL: export name must be Todoapp
let Todo = todoModel(sequelize, Sequelize);

console.log('CONFIG EXPORTS KEYS:', Object.keys({ sequelize, Sequelize, Todo }));

module.exports = { sequelize, Sequelize, Todo };