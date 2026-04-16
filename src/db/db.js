const mongoose = require('mongoose');

async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("MongoDB Connected");
        })
    }catch(err){
        console.log("Mongoose Error " + err.message);
    }
}

module.exports = connectToDb