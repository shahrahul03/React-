// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const authRoutes = require("../loginRoutes/auth");

// const app = express();

// app.use(bodyParser.json());

// mongoose
//   .connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.log("MongoDB connection error:", err);
//   });

// app.use("http://localhost:3000/register", authRoutes);

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Previous code//
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const app = express();
// const port = 3000;

// // Middleware to parse JSON data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Connect to MongoDB
// const mongoURI = "mongodb://127.0.0.1:27017/ehome";
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//     process.exit(1);
//   });
// app.use("http://localhost:3001/register/", authRoutes);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// const User = require('../server/models/user.js');
const authRoutes = require("../server/loginRoutes/auth.js");
const cors = require("cors");
const User = require("../server/models/user");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = "mongodb://127.0.0.1:27017/ehome";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.use(authRoutes);
app.get("/getUsers", (req, res) => {
  User.find() // Use the User model to find users
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
