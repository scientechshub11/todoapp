
let todoService = require('../services/todo.services');
let todoServiceObject = new todoService()
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command} = require('@aws-sdk/client-s3');
const REGION = 'ap-south-2';
require('dotenv').config();
const BUCKET='ecommerce-uploads-army-2026';
const s3 = new S3Client({
    region: "ap-south-2",
    // credentials: {
    //     accessKeyId:process.env.AWS_SECRET_ACCESS_KEY,
    //     secretAccessKey:process.env.AWS_ACCESS_KEY_ID
    // }
});
let filename = 'object-create-bucket'
let key = `uploads/${Date.now()}-${filename}`;

class TodoController {
    constructor(){

    }
    async getList(){
        let tododata = await todoServiceObject.getList()
        return tododata;
    }
    async uploadToS3(content){
        console.log(content)
        content = JSON.stringify(content)
        let s3Object={
             Bucket: BUCKET,
             Key: key,
             Body: content,
             ContentType: "text/plain"
        }
        let uploadtos3 = await s3.send(new PutObjectCommand(s3Object))
        return uploadtos3;
    }
    async getFromS3(){
        let uploadtos3 = await todoServiceObject.getList()
        return uploadtos3;
    }
    async deleteFromS3(){
        let uploadtos3 = await todoServiceObject.getList()
        return uploadtos3;
    }
    async listFromS3(){
        let uploadtos3 = await todoServiceObject.getList()
        return uploadtos3;
    }

}

module.exports = TodoController;