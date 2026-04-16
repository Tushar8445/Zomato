const foodModel = require("../models/food.model");
const storageService = require('../services/storage.service')




async function createFoodController(req, res) {
  try {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, req.file.originalname)

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    })

    res.status(201).json({
        message:"food created successfully",
        foodItem
    })


  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  createFoodController,
};
