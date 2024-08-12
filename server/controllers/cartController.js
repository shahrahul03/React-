// const Cart = require("../models/Cart");

// // Add to Cart
// const addToCart = async (req, res) => {
//   try {
//     // console.log("User from auth middleware:", req.user); // Add this line
//     const userId = req.user._id; // Use _id, assuming req.user is a Mongoose document
//     const { productId, quantity } = req.body;

//     if (!productId || !quantity) {
//       return res
//         .status(400)
//         .json({ error: "Product and quantity are required" });
//     }

//     let cart = await Cart.findOne({ user: userId });

//     if (cart) {
//       const itemIndex = cart.items.findIndex(
//         (item) => item.product.toString() === productId
//       );

//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ product: productId, quantity });
//       }
//     } else {
//       cart = new Cart({
//         user: userId,
//         items: [{ product: productId, quantity }],
//       });
//     }

//     await cart.save();
//     res.status(200).json({ message: "Cart updated successfully" });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get Cart
// const getCart = async (req, res) => {
//   const userId = req.user._id; // Assuming user ID comes from authenticated user
//   try {
//     const cart = await Cart.findOne({ user: userId }).populate("items.product");

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error retrieving cart:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { getCart, addToCart };

const Cart = require("../models/Cart");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Use _id, assuming req.user is a Mongoose document
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "Product and quantity are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Cart
const getCart = async (req, res) => {
  const userId = req.user.id; // Assuming user ID comes from authenticated user
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Product and quantity are required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json({ message: "Cart item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear Cart (Optional)
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
