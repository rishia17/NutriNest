// food-api.js
const exp = require("express");
const foodApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
require("dotenv").config();

// Middleware to get collections
foodApp.use((req, res, next) => {
  foodCollection = req.app.get("foodcollection");
  next();
});

foodApp.post('/newfood', expressAsyncHandler(async (req, res) => {
    const newFood = req.body;

    // Check if a food item with the same dateId already exists
    const existingFood = await foodCollection.findOne({ dateId: newFood.dateId });
    if (existingFood) {
        return res.send({ message: "Food item already exists" });
    }

    // Save the new food item to the food collection if it doesn’t exist
    await foodCollection.insertOne(newFood);

    // Send a success response
    res.send({ message: "New food item is added" });
}));


module.exports=foodApp