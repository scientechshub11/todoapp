
let todoService = require('../services/todo.services');
let todoServiceObject = new todoService()
class TodoController {
    constructor(){

    }
    async getList(){
        let tododata = await todoServiceObject.getList()
        return tododata;
    }
}

module.exports = TodoController;