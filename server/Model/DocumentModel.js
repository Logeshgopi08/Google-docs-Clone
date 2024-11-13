const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    _id:String,
    data:Object
});

module.exports = mongoose.model("Document",documentSchema);