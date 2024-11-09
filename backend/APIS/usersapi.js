// user-api.js
const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
require("dotenv").config();

// Middleware to get collections
userApp.use((req, res, next) => {
  userCollection = req.app.get("userscollection");
  next();
});

// User registration route
userApp.post('/user', expressAsyncHandler(async (req, res) => {
  const user = req.body;
  console.log(user);
  
  // Check if the user already exists and log the result
  const existingUser = await userCollection.findOne({ name: user.name });
  if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.send({ message: "User already exists" });
  }

  // Hash the password and insert the user
  const hashedPassword = await bcryptjs.hash(user.password, 7);
  user.password = hashedPassword;
  await userCollection.insertOne(user);

  res.send({ message: "User created" });
}));

userApp.post('/login', expressAsyncHandler(async (req, res) => {
  const user = req.body; // Retrieve user credentials from req.body
  
  // Find the user in the database
  const dbUser = await userCollection.findOne({ name: user.name });
  if (!dbUser) {
      return res.send({ message: "Invalid username" });
  }

  // Compare the provided password with the hashed password in the database
  const status = await bcryptjs.compare(user.password, dbUser.password);
  if (!status) {
      return res.send({ message: "Invalid password" });
  }

  // Generate a token if login is successful
  const signedToken = jwt.sign({ name: dbUser.name }, process.env.SECRET_KEY, { expiresIn: '1d' });
  delete dbUser.password; // Remove password from the response
  res.send({ message: "Login successful", token: signedToken, user: dbUser });
}));

userApp.put('/edit', expressAsyncHandler(async (req, res) => {
  const { name, newPassword, ...updatedFields } = req.body;

  // Find the user in the database
  const dbUser = await userCollection.findOne({ name });
  if (!dbUser) {
      return res.status(404).send({ message: "User not found" });
  }

  // Update password if provided in the request
  if (newPassword!=dbUser.password) {
      const hashedPassword = await bcryptjs.hash(newPassword, 7);
      updatedFields.password = hashedPassword;
  }

  // Ensure only valid fields are updated (you can add additional validation if needed)
  const allowedFields = ['email', 'gender', 'height', 'weight', 'streakCount', 'protein', 'calcium', 'fat', 'carbs', 'Vitamins'];
  const updates = Object.keys(updatedFields)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
          obj[key] = updatedFields[key];
          return obj;
      }, {});

  // Update user details in the database
  const result = await userCollection.updateOne(
      { name: name },
      { $set: updates }
  );

  if (result.modifiedCount > 0) {
      res.send({ message: "User details updated successfully" });
  } else {
      res.send({ message: "No changes made to user details" });
    }
}));






//export user App
module.exports = userApp;

