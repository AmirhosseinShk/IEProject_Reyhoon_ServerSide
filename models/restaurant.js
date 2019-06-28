const mongoose = require("mongoose");
const addressSchema = require("./address.js");
const CategorySchema = require("./category.js");
const FoodSchema = require("./food.js");
const CommentSchema = require("./comment.js");

const restaurantSchema = new mongoose.Schema({
    name:String,
    logo:String, // src of logo image
    openingTime:Number, // time of opening 
    closingTime:Number, // time of closing
    averageRate:Number, // average of comments rate 
    address: addressSchema.schema,
    categories:[CategorySchema.schema], // array of food categories. e.g. fastfood or irani  
    foods:[FoodSchema.schema],  
    comments:[CommentSchema.schema], 
});

module.exports = {
  schema: restaurantSchema,
  model: mongoose.model("restaurantSchema" , restaurantSchema , "restaurant")
};
