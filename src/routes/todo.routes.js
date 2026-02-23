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

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage})

router.post('/s3uploadImage', upload.single('image'), async(req, res)=>{
    let file = req.file;
    //console.log(file)
    if(!req.file){
        return res.json({message:"image file not found"});
    }
    let data = await todoControllerObject.putImageToS3(req.file);
    res.json({
        code:201,
        data,
        message:"get data from s3!!"
    })
})

router.get('/getImageDetails/:keyId', async(req, res)=>{
    try{
        let keyId = req.params;
        let data = await todoControllerObject.getImageDetails(keyId);
        res.json({
            code:201,
            data,
            message:"get data from s3!!"
        })
    }catch(err){
        console.log(err)
    }
});

router.get('/s3/presigned-url', async(req, res)=>{
    try{
        let {filename, contentType} = req.query;
        let data = await todoControllerObject.getPresignedUrl(filename, contentType);
        res.json(data);
    }
    catch(err){
        console.log(err)
    }
});

router.post('/send', async(req, res)=>{
    let {imageKey, action} = req.body;
    let data = await todoControllerObject.sendDataToSqs(imageKey, action);
    res.json({
        data,
        code:200,
        message:"Message Send To Queue!"
    })
})

module.exports = router;