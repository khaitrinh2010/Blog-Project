
const mongoose = require("mongoose")
//username: trinhlamkhai
//password: WYSjArFoA2ibFpaG
const URL = process.env.URL
const connectDB = async()=>{
    try{
        await mongoose.connect(URL)
        console.log("Mongoose connects successfully")
    }
    catch(error){
        console.log(error)
    }
}

connectDB()