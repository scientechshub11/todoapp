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

router.post('/s3upload', async(req, res)=>{
    let  content = req.body;
    let data = await todoControllerObject.uploadToS3(content);
    res.json({
        code:200,
        data,
        message:"upload successfull!!!!!"
    })
})

module.exports = router;