const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: String,     // rates 
    quality: Number, // a number between 0-5 
    packaging: Number,
    deliveryTime: Number,   
    text: String, 
    created_at: Date, // time where comment submitted 
});

module.exports = {
    schema: commentSchema,
    model: mongoose.model("commentSchema" , commentSchema , "comment")
};