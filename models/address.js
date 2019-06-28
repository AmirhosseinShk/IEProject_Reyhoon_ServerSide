const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city: String, // e.g. Tehran     
    area: String, // e.g. Keshavarz Blvd, 
    addressLine:String, // full address text 
});

module.exports = {
    schema: addressSchema,
    model: mongoose.model("addressSchema " ,addressSchema , "address")
};