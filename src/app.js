const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');
require('dotenv').config();
const { sequelize } = require("./config/config");
const {SQSClient, SendMessageCommand, ReceiveMessageCommand} = require('@aws-sdk/client-sqs')
const sqs = new SQSClient({region:"ap-south-2"})
let port = process.env.port||7072;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// (async function initDb() {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     console.log("✅ DB connected & synced");
//   } catch (err) {
//     console.error("❌ DB connection failed:", err); // <-- print real error
//     process.exit(1); // optional: fail fast so PM2 restarts once
//   }
// })();
app.get('/testapi', async(req,res)=>{
    res.json({
        code:200,
        message:"success"
    })
})

async function pollMessage() {
    let QUEUE_URL = 'https://sqs.ap-south-2.amazonaws.com/395512255733/image-processing-queue';
    let data = await sqs.send(new ReceiveMessageCommand({
            QueueUrl: QUEUE_URL,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 10

    }))
    if (data.Messages) {
    for (const msg of data.Messages) {
      console.log("Processing:", msg.Body);

      await sqs.send(new DeleteMessageCommand({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: msg.ReceiptHandle
      }));
    }
  }
}
pollMessage()
app.use('/api', todoRoutes)
// 👇 IMPORTANT: bind to 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`app listen to the port: ${port}`);
});