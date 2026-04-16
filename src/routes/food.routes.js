const express = require('express')
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})

const {createFoodController, getFoodItems} = require('../controllers/food.controller')
const {authFoodPartnerMiddleware, authUserMiddleware} = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/',authFoodPartnerMiddleware,upload.single("video"),createFoodController)

router.get('/',authUserMiddleware,getFoodItems)

module.exports = router
