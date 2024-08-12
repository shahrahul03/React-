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
const authRoutes = require("../server/Routes/authRoute");
const cors = require("cors");
const profileRoutes = require("../server/Routes/ProfileRoutes");
const productRoutes = require("../server/Routes/productRoutes");
const userProfileRoutes = require("../server/Routes/userProfileRoutes");
const categoryRoutes = require("../server/Routes/categoryRoute");
const contactRoutes = require("./Routes/contactRoutes");

const cartRoutes = require("./Routes/cartRoutes");
const addressRoutes = require("./Routes/addressRoutes");
const orderRoutes = require("./Routes/orderRoutes");
// const authMiddleware = require("./middleware/authMiddleware");
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

// app.use(authRoutes);
// app.use(authMiddleware);
app.use("/user", userProfileRoutes);
app.use("/api/auth/", authRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/profile", profileRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
