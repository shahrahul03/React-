import React from "react";
import FooterComponent from "../FooterComponent/footerComponent";
function Home() {
  return (
    <>
    <section id="home">
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      
    </section>
    <footer className="footer">
          <FooterComponent />
        </footer>
    </>
  );
}
export default Home;