const userModel = require("../models/user.model");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const tokenBlackListModel = require("../models/blackList.model")


async function userRegisterController(req,res){
  try {
    const {email,password,name} = req.body ;

    const isExists = await userModel.findOne({email})
    if(isExists){
      return res.status(400).json({message:"User already exists"})
    }

    const user = await userModel.create({email,password,name})
    
    // Fallback secret if JWT_SECRET is not in .env yet
    const secret = process.env.JWT_SECRET || "supersecretkey";
    const token = jwt.sign({userId:user._id}, secret, {expiresIn:"1h"})
    
    res.cookie("token",token) // Fixed from res.cookies to res.cookie
    
    // Send email before returning the response
    await emailService.sendRegisterationEmail(user.email, user.name);
    
    return res.status(201).json({
      message: "User created successfully",
      user:{
        _id:user._id,
        email:user.email,
        name:user.name
      },
      token
    })
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function userLoginController(req,res){
  try {
    const {email,password} = req.body;
   const user = await userModel.findOne({email}).select('+password')
    if(!user){
      console.log(`Login failed: User not found for email '${email}'`);
      return res.status(400).json({message:"User not found"})
    }
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid){
      console.log(`Login failed: Invalid password provided for email '${email}'`);
      return res.status(400).json({message:"Invalid password"})
    }
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"})
    res.cookie("token",token)
    return res.status(200).json({
      message:"User logged in successfully",
      user:{
        _id:user._id,
        email:user.email,
        name:user.name
      },
      token
    })
    
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}


module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController
}