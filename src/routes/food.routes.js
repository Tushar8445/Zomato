const express = require('express')
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})

const {createFoodController} = require('../controllers/food.controller')
const {authFoodPartnerMiddleware} = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/',authFoodPartnerMiddleware,upload.single("video"),createFoodController)

module.exports = router
