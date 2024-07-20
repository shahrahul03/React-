import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../img/logo.png"; // Adjust the path to your logo
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      if (!mobileView && isOpen) {
        setIsOpen(false); // Close the menu when switching to laptop view
      }
      setIsMobile(mobileView);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className={`navbar__links ${isOpen ? "open" : ""}`}>
        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
        <Link to="/home" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        <Link to="/products" onClick={closeMenu}>
          Products
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
      </nav>
      <button className="navbar__toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Navbar;
