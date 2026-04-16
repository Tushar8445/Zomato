const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/food-partner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register normal user
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const isUserExist = await userModel.findOne({
      email,
    });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "User Registered successfully",
      user: {
        id: user._id,
        fullName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error " + error.message,
    });
  }
}
//login normal user
async function loginUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(200).json({
      message: "user logged in successfully",
      user: {
        id: user._id,
        fullName,
        email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
//logout user
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

//register food partner api
async function foodPartnerRegister(req, res) {
  try {
    const { name, contactName, phone, address, email, password } = req.body;
    

    const isUserExist = await foodPartnerModel.findOne({
      email,
    });

    

    if (isUserExist) {
      return res.status(401).json({
        message: "User Already exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name:name,
      contactName:contactName,
      phone:phone,
      address:address,
      email:email,
      password: hash
    });

    console.log(foodPartner)

    const token = jwt.sign(
      { id: foodPartner._id },
       process.env.JWT_SECRET,
      {expiresIn: "1d",}
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "foodPartner created successfully",
      foodPartner: {
        id: foodPartner._id,
        name,
        contactName,
        phone,
        address,
        email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

// Login food Partner API
async function foodPartnerLogin(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await foodPartnerModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(200).json({
      message: "user logged in successfully",
      user: {
        id: user._id,
        name,
        email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  foodPartnerRegister,
  foodPartnerLogin,
};
