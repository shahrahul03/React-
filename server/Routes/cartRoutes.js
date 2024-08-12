const express = require("express");
// const { default: CartComponent } = require("../../my-aap/src/components/CartComponent/Cart");
const CartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/cart", authMiddleware, CartController.addToCart); // Apply authMiddleware here
router.get("/cart/all", authMiddleware, CartController.getCart);
router.put("/update", authMiddleware, CartController.updateCartItem);
router.delete("/delete", authMiddleware, CartController.deleteCartItem);
router.delete("/clear", authMiddleware, CartController.clearCart);
module.exports = router;
