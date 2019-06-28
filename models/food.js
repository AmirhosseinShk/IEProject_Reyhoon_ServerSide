const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name:String,
  price:Number, // price of this food in Tomans
  description:String, // optional
  foodSet:String, // set of this food like kabab, khorak, salad 
});

module.exports = {
  schema: foodSchema,
  model: mongoose.model("foodSchema " , foodSchema , "food")
};
