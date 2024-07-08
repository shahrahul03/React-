import React from "react";
import Navbar from "./Navbar";
import "./App.css";
import Timer from "./classComponent";
import CounterFunction from "./functionComponent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="content">
        <section id="home">
          <h2>Home</h2>
          <p>Welcome to the home page!</p>
          <Timer />
          <CounterFunction />
        </section>
        <section id="about">
          <h2>About</h2>
          <p>This is the about section.</p>
        </section>
        <section id="products">
          <h2>Products</h2>
          <p>Check out our products here.</p>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p>Get in touch with us!</p>
        </section>
      </main>
    </div>
  );
}

export default App;
