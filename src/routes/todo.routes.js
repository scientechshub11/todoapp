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
router.post('/test/s3upload', async(req, res)=>{
    let  content = req.body;
    let data = await todoControllerObject.uploadTestFileTos3(content);
    res.json({
        code:201,
        data,
        message:"upload successfull!!!!!"
    })
});

router.get('/s3upload/list', async(req, res)=>{
    let data = await todoControllerObject.listFromS3()
    res.json({
        code:201,
        data,
        message:"get data from s3!!"
    })
})

router.get('/s3upload/:key', async(req, res)=>{
    const {key} = req.params;
    let data = await todoControllerObject.getFromS3(key);
    res.json({
        code:201,
        data,
        message:"get data from s3!!"
    })
})

router.delete('/s3upload/:key', async(req, res)=>{
    const {key} = req.params;
    let data = await todoControllerObject.deleteFromS3(key);
    res.json({
        code:201,
        data,
        message:"get data from s3!!"
    })
})



module.exports = router;