const express = require("express");
const resturant = require("../models/restaurant.js");
const comments = require("../models/comment.js");


const foodRouter = express.Router();

foodRouter
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  .get("/", (req, res) => {
    var categories = req.query.category;
    console.log(categories);
    if (categories == undefined) {
      var area = req.query.area;
      resturant.model.find({}, (err, restaurants) => {
        if (err) {
          res.send(err);
        }
        var correctRest = new Array();
        for (var i = 0; i < restaurants.length; i++) {
          if (restaurants[i].address.area == area) {
            correctRest.push(restaurants[i]);
          }
        }
        res.send(correctRest);
      });
    } else {
      var area = req.query.area;
      var categories = req.query.category;
      var restResult = [];
      console.log(categories);
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
              var find = true;
              for (var i = 0; i < categories.length; i++) {
                var find2 = false;
                for (var c = 0; c < restaurants[j].categories.length; c++) {
                  if (restaurants[j].categories[c].name == (categories[i])) {
                    find2 = true;
                  }
                }
                if (!find2)
                  find = false;
              }
              if (find) {
                restResult.push(restaurants[j]);
              }
            } else {
              for (var c = 0; c < restaurants[j].categories.length; c++) {
                if (restaurants[j].categories[c].name == categories) {
                  restResult.push(restaurants[j]);
                }
              }
            }
          }
        }
        res.send(restResult);
      });
    }
  })

  .get("/:id", (req, res) => {
    console.log("hereeeeee2");
    var restName = req.params.id;
    if (restName != undefined) {
      resturant.model.find({ 'englishName': restName }, (err, rest) => {
        if (err) {
          res.send(err);
        }
        var Comments = rest[0].comments;
        var avgRate = 0;
        for (var i = 0; i < Comments.length; i++) {
          avgRate += Comments[i].quality;
        }
        avgRate = avgRate / Comments.length;
        avgRate = avgRate.toFixed(1);
        rest[0].averageRate = avgRate;
        res.send(rest);
      });
    }
  })

  .get("/:id/comments", (req, res) => {
    var restName = req.params.id;
    if (restName != undefined) {
      resturant.model.find({ 'englishName': restName })
        .select({ comments: 1 })
        .exec(function (err, restComments) {
          if (err) {
            res.send(err);
          }
          let resComments = new comments.model();
          resComments = restComments[0];
          resComments.comments.sort(compare);
          res.send(restComments);
        });
    }
  })

  .post("/:id/comments", (req, res) => {
    var restName = req.params.id;
    if (restName != undefined) {
      resturant.model.find({ 'englishName': restName })
        .select({ comments: 1 })
        .exec(function (err, restComments) {
          if (err) {
            res.send(err);
          }
          let commentsObject = new comments.model();
          commentsObject.author = req.body.author;
          commentsObject.quality = req.body.quality;
          commentsObject.packaging = req.body.packaging;
          commentsObject.deliveryTime = req.body.deliveryTime;
          commentsObject.text = req.body.text;
          commentsObject.created_at = req.body.created_at;
          restComments[0].comments.push(commentsObject);
          resturant.model.findOneAndUpdate({ 'englishName': restName }, { $set: { comments: restComments[0].comments } }, { new: true }, (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
            }
            console.log(doc);
          });
          //rest.save();
          res.json({
            message: "success"
          });
        });
    } else {
      res.json({
        message: "Resturant Name undefined"
      });
    }
  })

  .post("/", (req, res) => {
    let resturantObject = resturant.model();
    resturantObject.name = req.body.name;
    resturantObject.logo = req.body.logo;
    resturantObject.openingTime = req.body.openingTime;
    resturantObject.closingTime = req.body.closingTime;
    resturantObject.averageRate = req.body.averageRate;
    resturantObject.address = req.body.address;
    resturantObject.categories = req.body.categories;
    resturantObject.foods = req.body.foods;
    resturantObject.comments = req.body.comments;
    resturantObject.save();
    res.json({
      message: "success"
    });
  });

function compare(a, b) {
  if (a.created_at < b.created_at) {
    return 1;
  }
  if (a.created_at > b.created_at) {
    return -1;
  }
  return 0;
}


module.exports = foodRouter;
