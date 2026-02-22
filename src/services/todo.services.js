// src/services/todo.services.js
const db = require('../config/config');
console.log('DB IMPORT KEYS:', Object.keys(db || {}));

class TodoServices {
  constructor() {
    this.todoModel = db.Todo; // this was undefined before
  }

  async getList() {
    console.log("hello from services====>")
    return await this.todoModel.findAll();
  }
}

module.exports = TodoServices;