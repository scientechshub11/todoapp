const {Sequelize} = require('sequelize');
const todoModel = require('./models/todo');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME,process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
    host: process.env.POSTGRES_HOST,
    port:process.env.DB_PORT,
    dialect:'postgres',
    logging: true, // turn off noisy SQL logs (optional)
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false   // 👈 fix for SELF_SIGNED_CERT_IN_CHAIN
      }
    }
})
const Todo = todoModel(sequelize, Sequelize)
module.exports = {sequelize, Sequelize, Todo};