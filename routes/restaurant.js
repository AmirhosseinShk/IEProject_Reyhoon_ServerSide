const express = require("express");
const food = require("../models/food.js");
const address = require("../models/address.js");
const resturant = require("../models/restaurant.js");


const foodRouter = express.Router();

foodRouter
  .get("/", (req, res) => {
    var categories = req.query.category;
    if (categories == undefined) {
      var area = req.query.area;
      resturant.model.find({}, (err, restaurants) => {
        if (err) {
          res.send(err);
        }
        console.log(restaurants[0]);
        if (restaurants[0].address.area == area) {
          res.send(restaurants);
        }
      });
    } else {
      var area = req.query.area;
      var categories = req.query.category;
      isArray = function (a) {
        return (!!a) && (a.constructor === Array);
      };
      resturant.model.find({}, (err, restaurants) => {
        if (err) {
          res.send(err);
        }
        for (var j = 0; j < restaurants.length; j++) {
          if (restaurants[j].address.area == area) {
            if (isArray(categories)) {
              for (var i = 0; i < categories.length; i++) {
                var find = false;
                console.log(restaurants[j].categories + ":" + categories[i]);
                for (var c = 0; c < restaurants[j].categories.length; c++) {
                  if (restaurants[j].categories[c].name == categories[i]) {
                    find = true;
                  }
                }
              }
              if (find) {
                res.send(restaurants[j]);
              }
            } else {
              for (var c = 0; c < restaurants[j].categories.length; c++) {
                if (restaurants[j].categories[c].name == categories) {
                  res.send(restaurants[j]);
                }
              }
            }
          }
        }
      });
    }
  })

  .get("/:id", (req, res) => {

  })

  .post("/", (req, res) => {
    let foodObject = new food.model();
    console.log("here");
    console.log(req.body);
    foodObject.name = req.body.name;
    foodObject.price = req.body.price;
    foodObject.description = req.body.description;
    foodObject.foodSet = req.body.foodSet;
    foodObject.save();
    res.json({
      message: "success"
    });
  });


module.exports = foodRouter;
