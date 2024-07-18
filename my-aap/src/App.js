import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbarComponent/Navbar";
import "./App.css";
import Products from "./pages/productPage";
import Home from "./pages/homePage";
import Contact from "./pages/contactPage";
import About from "./pages/aboutPage";
import Login from "../src/loginComponent/loginComponent";
import FooterComponent from "../src/FooterComponent/footerComponent";

// function Home() {
//   return (
//     <section id="home">
//       <h2>Home</h2>
//       <p>Welcome to the home page!</p>
//       <Timer />
//       <CounterFunction />
//     </section>
//   );
// }

// function About() {
//   return (
//     <section id="about">
//       <h2>About</h2>
//       <p>This is the about section.</p>
//       <GreetRahulComponent />
//     </section>
//   );
// }

// function Products() {
//   return (
//     <section id="products">
//       <h2>Products</h2>
//       <p>Check out our products here.</p>
//       <CardComponent />
//     </section>
//   );
// }

// function Contact() {
//   return (
//     <section id="contact">
//       <h2>Contact</h2>
//       <p>Get in touch with us!</p>
//     </section>
//   );
// }

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
