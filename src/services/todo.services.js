const db = require('../config/config')

class TodoServices {
    constructor(){
        this.db = db;
        this.todoModel = this.db.Todo

    }
    async getList(){
        let tododata = await this.todoModel.findAll({})
        return tododata; 
    }
}

module.exports = TodoServices;