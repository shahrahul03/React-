import React, { useState } from "react";
import "./Navbar.css";
import logo from "../src/img/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className={`navbar__links ${isOpen ? "open" : ""}`}>
        <a href="#home" onClick={toggleMenu}>
          Home
        </a>
        <a href="#about" onClick={toggleMenu}>
          About
        </a>
        <a href="#products" onClick={toggleMenu}>
          Products
        </a>
        <a href="#contact" onClick={toggleMenu}>
          Contact
        </a>
      </nav>
      <button className="navbar__toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Navbar;
