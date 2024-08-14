import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbarComponent/Navbar";
import "./App.css";
import Home from "./components/pages/homePage";
import Products from "./components/pages/ManageProductPage";
import Contact from "./components/pages/contactPage";
import About from "./components/pages/aboutPage";
import Login from "./components/loginComponent/loginComponent";
import CategoryComponent from "./components/Category/CategoryComponent";
import ProfileComponent from "./components/profileComponent/ProfileComponent";
import AddProductComponent from "./components/AddProductsComponent/AddProductsComponent";
import AdminContactPage from "./components/AdminContactPageComponent/AdminContactPageComponent";
import Shop from "./components/Shop/ShopComponent";
import ProductDetails from "./components/ProductsDetails/ProductsDetailsComponent";
import Cart from "./components/CartComponent/Cart";
import Checkout from "./components/checkOutComponent/checkOutComponent";
import AllProduct from "./components/AllOrder/AllOrder";
import ProtectedRoute from "./ProtectedRoutes/protectedRoute";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute role="admin">
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/category"
              element={
                <ProtectedRoute role="admin">
                  <CategoryComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addProduct"
              element={
                <ProtectedRoute role="admin">
                  <AddProductComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminContact"
              element={
                <ProtectedRoute role="admin">
                  <AdminContactPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  {" "}
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute role="admin">
                  <AllProduct />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
