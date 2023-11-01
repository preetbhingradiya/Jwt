const jwt=require("jsonwebtoken")
const User = require("../model/userSchema")


const information=(req,res,next)=>{
    let {username,email,password}=req.body

    if(!username || !email || !password){
        res.send("please fill all required fields")
    }
    else{
        next()
    }
}

const verify=async(req,res,next)=>{
    let {token}=req.cookies
    if(token){
        let decode=jwt.verify(token,"jfirifpeofoef")
        let {id}=decode
        req.user=await User.findById(id)
        next()
    }
    else{
        res.status(400).send({ success: false, message: "Please check Login and Try agin" })
    }
}

module.exports={information,verify}