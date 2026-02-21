const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');
require('dotenv').config();
const { sequelize } = require("./config/config");
let port = process.env.port||7072;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
(async function initiDb() {
        try{
            await sequelize.authenticate()
            await sequelize.sync()
        }
        catch(err){
            console.log("Db connection failed for postgres/rds")
        }
}())
app.get('/testapi', async(req,res)=>{
    res.json({
        code:200,
        message:"success"
    })
})
app.use('/api', todoRoutes)
// 👇 IMPORTANT: bind to 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`app listen to the port: ${port}`);
});