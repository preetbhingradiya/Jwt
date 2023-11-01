const User = require("../model/userSchema");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const Register = async (req, res) => {
  let { username, email, password } = req.body;
  const hastpassword=await bcrypt.hash(password,10);
  let user = await User.create({
    username,
    email,
    password:hastpassword,
  });
  res.send(user);
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user)
    return res.status(400).send({ success: false, message: "User not found" });

    const isMatch=await bcrypt.compare(password,user.password)

  if (user.email !== email || !isMatch)
    return res
      .status(400)
      .send({ success: false, message: "Please check Email Or Password" });

    let token=jwt.sign({id:user.id},"jfirifpeofoef")
    
    res.cookie("token",token,{ maxAge: 1 * 60 * 1000,}).send({ success: true, message: `Welcome back user ${user.username} 🖐🖐`})
};

const Home=async(req,res)=>{
    res.send({success:true,profile:`${req.user.username}'s profile`,user:req.user})
}

module.exports = { Register, Login,Home };
