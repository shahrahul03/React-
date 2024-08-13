import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../img/logo.png"; // Adjust the path to your logo
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toggle } from "../../features/navbar/navbarSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      if (!mobileView && isOpen) {
        dispatch(toggle()); // Close the menu when switching to laptop view
      }
      setIsMobile(mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  const toggleMenu = () => {
    if (isMobile) {
      dispatch(toggle());
    }
  };

  const closeMenu = () => {
    if (isMobile && isOpen) {
      dispatch(toggle());
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className={`navbar__links ${isOpen ? "open" : ""}`}>
        <Link to="/home" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        {authState.userRole === "admin" && (
          <>
            <Link to="/products" onClick={closeMenu}>
              Manage Products
            </Link>
            <Link to="/category" onClick={closeMenu}>
              Category
            </Link>
            <Link to="/addProduct" onClick={closeMenu}>
              Add Products
            </Link>
            <Link to="/adminContact" onClick={closeMenu}>
              Admin Contact Manage
            </Link>
            <Link to="/orders" onClick={closeMenu}>
              All Orders
            </Link>
          </>
        )}
        {authState.isAuthenticated && (
          <>
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
            <Link to="/cart" onClick={closeMenu}>
              My Cart
            </Link>
            <Link to="/shop" onClick={closeMenu}>
              Shop
            </Link>
          </>
        )}
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
        {authState.isAuthenticated ? (
          <button onClick={() => dispatch(logout())}>Log out</button>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>
      <button className="navbar__toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Navbar;
