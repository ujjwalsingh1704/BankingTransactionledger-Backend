const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blackList.model")





async function authMiddleware(req,res,next){
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({message:"Unauthorized"})
    }

    const isBlacklisted = await tokenBlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findById(decodedToken.userId)
    if(!user){
      return res.status(401).json({message:"Unauthorized"})
    }
    req.user = user
    next()
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function authSystemUserMiddleware(req,res,next){
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({message:"Unauthorized"})
    }


     const isBlacklisted = await tokenBlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }


    
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findById(decodedToken.userId).select("+systemUser")
    if(!user){
      return res.status(401).json({message:"Unauthorized"})
    }
    if(!user.systemUser){
      return res.status(401).json({message:"Unauthorized"})
    }
    req.user = user
    next()
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {

  authMiddleware,
  authSystemUserMiddleware
}

