const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("../loginRoutes/auth");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/ehome.user")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.use("http://localhost:5000/register", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
