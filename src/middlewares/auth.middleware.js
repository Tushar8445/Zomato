const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/food-partner.model");
const userModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(400).json({
        message: "user not Matched",
      });
    }

    req.foodPartner = foodPartner;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

async function authUserMiddleware(req, res, next){


  const token = req.cookies.token
  if(!token){
    return res.status(400).json({
      message:"Token not provided"
    })
  }
  try{

    const decoded =  jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    req.user = user

    next()

  }catch(err){
    return res.status(400).json({
      message:"Invalid Token"
    })
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
