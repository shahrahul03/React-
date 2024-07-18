import React from "react";
import CardComponent from "../cardComponent/cardComponent";
import FooterComponent from "../FooterComponent/footerComponent";
function Products() {
  return (
    <>
    <body id="product">
      <h2>Products</h2>
      <p>This is the products section.</p>
      <CardComponent/>
    </body>
    <footer className="footer">
          <FooterComponent />
        </footer>
    </>
  );
}
export default Products;