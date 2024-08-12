const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  country: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  address: { type: String, required: true },
  apartment: { type: String },
  state: { type: String },
  postal: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  orderNotes: { type: String },
  cartItems: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
