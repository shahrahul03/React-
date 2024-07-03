import React from 'react';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="home">
        <h1>Home</h1>
        <p>Welcome to the home section.</p>
      </section>
      <section id="about">
        <h1>About</h1>
        <p>Learn more about us in this section.</p>
      </section>
      <section id="Products">
        <h1>Services</h1>
        <p>Check out the services we offer.</p>
      </section>
      <section id="contact">
        <h1>Contact</h1>
        <p>Get in touch with us here.</p>
      </section>
    </div>
  );
}

export default App;
