// src/services/todo.services.js
const db = require('../config/config');
console.log('DB IMPORT KEYS:', Object.keys(db || {}));

class TodoServices {
  constructor() {
    this.todoModel = db.Todoapp; // this was undefined before
  }

  async getList() {
    return await this.todoModel.findAll();
  }
}

module.exports = TodoServices;