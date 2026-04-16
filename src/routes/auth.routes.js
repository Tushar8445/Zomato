const express = require('express')
const {registerUser, loginUser,logoutUser} = require('../controllers/auth.controller')
const {foodPartnerRegister, foodPartnerLogin} = require('../controllers/auth.controller')
const {checkFoodPartner} = require('../middlewares/auth.middleware')

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)


// food partner APIs 
router.post('/food-partner/register',foodPartnerRegister)
router.post('/food-partner/login',foodPartnerLogin)

module.exports = router