const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8084;

mongoose.connect("mongodb://localhost/reyhoon", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("DB connection alive");
});

app.use(express.json());

//routers
const restaurant = require("./routes/restaurant.js");
app.use("/api/restaurants", restaurant);

app.listen(port, () => console.log(`listening on port ${port}!`));
