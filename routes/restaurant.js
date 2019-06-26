const express = require("express");
const food = require("../models/food.js");

const foodRouter = express.Router();

foodRouter
  .get("/", (req, res) => {
    console.log(req.query.area)
        food.model.find({}, (error, foods) => {
          if (error) {
            res.send(error);
          }
          res.send(foods);
  });
  })

  .post("/", (req, res) => {
    let foodObject = new food.model();
    console.log("here");
    console.log(req.body);
    foodObject.name = req.body.name;
    foodObject.price = req.body.price;
    foodObject.description = req.body.description;
    foodObject.foodSet = req.body.foodSet ;
    foodObject.save();
    res.json({
      message: "success"
    });
  });


module.exports = foodRouter;
