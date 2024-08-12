const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Place an Order
router.post("/place-order", async (req, res) => {
  try {
    const orderData = req.body;

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
});

// Get All Orders
router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send the list of orders as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve orders", error });
  }
});

module.exports = router;
