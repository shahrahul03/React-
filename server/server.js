const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
