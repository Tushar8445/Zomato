const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const foodRouter = require('./routes/food.routes')

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/food',foodRouter)



module.exports = app