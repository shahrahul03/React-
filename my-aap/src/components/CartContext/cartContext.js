import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to get the auth token from local storage
  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Adjust this if your token is stored elsewhere
  };

  // Create the axios instance with Authorization header
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: ` ${getAuthToken()}`, // Corrected to include "Bearer "
    },
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart/all");
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [api]); // Include api in dependency array

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await api.post("/cart", {
        productId: product._id,
        quantity,
      });
      console.log(response);
      setCartItems(response.data.items); // Update cartItems from the server response
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete("/delete", {
        data: { productId },
      });
      setCartItems(response.data.items); // Update cartItems from the server response
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.put("/update", { productId, quantity });
      setCartItems(response.data.items); // Update cartItems from the server response
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
