
let todoService = require('../services/todo.services');
let todoServiceObject = new todoService();
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const {getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const {SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
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
const sqs = new SQSClient({region:"ap-south-2"})
let filename = 'object-create-bucket'
let imageuploadfilename = 'object-file-upload'
let newfilename = 'object-test-bucket'
let key = `uploads/${Date.now()}-${filename}`;
let testkey = `test/${Date.now()}-${newfilename}`
let imageUploadKey = `image/${Date.now()}-${imageuploadfilename}`
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
            Bucket:BUCKET,
            Prefix: 'uploads/'
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
    async putImageToS3(file){
        console.log(file)
        //imageUploadKey
        imageUploadKey = `uploads/${Date.now()}-${file.originalname}`;
        let s3uploadobject = {
            Bucket:BUCKET,
            Key:imageUploadKey,
            Body:file.buffer,
            ContentType: file.mimetype

        }
        let uploadtos3 = await s3.send(new PutObjectCommand(s3uploadobject));
        return uploadtos3;
    }

    async getImageDetails(keyId){
        let getImageObject = {
            Key:keyId,
            Bucket:BUCKET
        }
        let getImageDetails = await s3.send(new GetObjectCommand(getImageObject));
        return getImageDetails;
    };

    async getPresignedUrl(filename, contentType){
        let key = `uploads/${Date.now()}-${filename}`
        const command = new PutObjectCommand({
            Bucket:BUCKET,
            Key: key,
            ContentType:contentType 
        })
        let uploadUrl = await getSignedUrl(s3, command, {expiresIn: 300});
        return{
            uploadUrl,
            key,
            publicUrl: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
        }
    };

    async sendDataToSqs(imageKey, action){
        try{
            let sqsUrl = 'https://sqs.ap-south-2.amazonaws.com/395512255733/image-processing-queue'
            let message = {
                imageKey,
                action,
                createdAt: new Date().toISOString()
            }
            let sendtoqueue= await sqs.send(SendMessageCommand({
                    QueueUrl:sqsUrl,
                    MessageBody: JSON.stringify(message)
            }))
            return sendtoqueue
        }
        catch(err){
            console.log(err)
        }       
    }
}



//https://sqs.ap-south-2.amazonaws.com/395512255733/image-processing-queue

module.exports = TodoController;