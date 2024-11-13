
const mongoose = require("mongoose");


const ConnectDb = async()=>{
    await mongoose.connect("mongodb+srv://Logesh:7jb2DunzD5AlVZzt@logesh.jolaj.mongodb.net/googleDocs");
    console.log("Database Connected");
    
}

module.exports = ConnectDb;