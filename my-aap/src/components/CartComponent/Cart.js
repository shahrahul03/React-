import React from "react";
import { useCart } from "../CartContext/cartContext";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { cartItems = [], removeFromCart, updateQuantity, loading } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">Loading your cart...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Shopping Cart
      </h2>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <ul className="space-y-6">
          {cartItems.length === 0 ? (
            <li className="text-center text-xl">Your cart is empty</li>
          ) : (
            cartItems.map((item, index) => (
              <li
                key={item.product?._id || `item-${index}`} // Fallback key if product._id is missing
                className="flex items-center space-x-6"
              >
                <img
                  src={
                    item.product?.productImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt={item.product?.name || "Product image"}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {item.product?.name || "Unnamed Product"}
                  </h3>
                  <p className="text-gray-600">
                    Price: ${item.product?.price?.toFixed(2) || "0.00"}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product?._id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product?._id,
                          item.quantity + 1
                        )
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  ${(item.product?.price * item.quantity || 0).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.product?._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </p>
            <div className="space-x-4">
              <button
                onClick={handleContinueShopping}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
