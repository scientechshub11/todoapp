
let todoService = require('../services/todo.services');
let todoServiceObject = new todoService()
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
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
let newfilename = 'object-test-bucket'
let key = `uploads/${Date.now()}-${filename}`;
let testkey = `test/${Date.now()}-${newfilename}`
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
    async uploadTestFileTos3(content){
        content = JSON.stringify(content);
        let s3Object = {
            Bucket:BUCKET,
            Key:testkey,
            Body:content,
            ContentType: "text/plain"
        }
        let uploadtos3 = await s3.send(new PutObjectCommand(s3Object));
        return uploadtos3;
    }
    async listFromS3(){
        let getS3Object ={
            Bucket:BUCKET
        } 
        let s3data = await s3.send(new ListObjectsV2Command(getS3Object))
        return s3data;
    }
    async getFromS3(keyId){
        let getS3Object ={
            Bucket:BUCKET,
            Key:keyId
        } 
        let s3data = await s3.send(new GetObjectCommand(getS3Object))
        return s3data;
    }
    async deleteFromS3(keyId){
        let deleteFromS3 = {
            Bucket:BUCKET,
            Key:keyId
        }
        let uploadtos3 = await s3.send(new DeleteObjectCommand(deleteFromS3))
        return uploadtos3;
    }
    // async listFromS3(){
    //     let uploadtos3 = await todoServiceObject.getList()
    //     return uploadtos3;
    // }

}

module.exports = TodoController;