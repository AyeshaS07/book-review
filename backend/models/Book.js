const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName: String,
    author:String,
    review:String,
    rating:Number
});
module.exports = mongoose.model("Book",bookSchema);x