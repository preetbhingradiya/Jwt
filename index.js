const express=require("express");
const connect = require("./config/databse");
const cookie=require("cookie-parser")
const user = require("./routes/routes");

const app=express()
app.use(cookie())
app.use(express.json())

app.use('/user',user)

app.listen(5000,(req,res)=>{
    console.log("connect to port 5000");
    connect()
})