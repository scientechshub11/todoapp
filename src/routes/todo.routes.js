const express = require('express');
const router = express.Router();
let todoController = require('../controllers/todo.controller');
let todoControllerObject = new todoController()

router.get('/todo', async(req, res)=>{
    let data = await todoControllerObject.getList()
    res.json({
        message:"todo list is getting successfully!",
        data
    })
})

module.exports = router;