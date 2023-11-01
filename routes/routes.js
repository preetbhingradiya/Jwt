const express=require("express")
const { information, verify } = require("../middleware/middleware")
const { Register, Login, Home } = require("../controllers/user-controler")

const user=express()

user.post("/register",information,Register)
user.post('/login',Login)
user.get("/me",verify,Home)

module.exports=user