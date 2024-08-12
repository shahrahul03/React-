import React from "react";
import FooterComponent from "../FooterComponent/footerComponent";
import img from "../../img/productsimg.jpg";
import logo from "../../img/logo.png"
function About() {
  return (
    <>
      <div className="w-full border-solid border-2  mb-4 overflow-hidden">
        <div className="h-auto relative">
          <img 
            src={img}
            
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-bold text-red-900 p-4 rounded-lg">
            About Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center w-full">
          
        <div className="flex flex-col md:flex-row justify-center items-center w-full bg-gray-100 border-solid border-2 rounded-3xl border-red-500 p-6 md:p-8 shadow-lg">
  <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-md">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-600">About eHome</h1>
    <p className="text-base md:text-lg mb-4 leading-relaxed">
      eHome started its operations in 1994 from Nepal. After reaching the pinnacle of success in Nepal, the operations were expanded to Indian markets in the year 2005. The company has become a leading name in Glassware, Kitchenware, and Electrical Appliances.
    </p>
    <ul className="text-left list-disc list-inside mb-4 space-y-2">
      <li>Total and thorough customer satisfaction with the assistance of our existing 250+ Distributors and 5000+ Dealers.</li>
      <li>Advanced manufacturing techniques and equipment.</li>
      <li>Own in-house Electrical & Physical Testing Labs equipped with the latest, modern, and sophisticated equipment.</li>
      <li>Approved by various quality institutions including ISI, CE, and ISO.</li>
      <li>Commitment to quality with dedication to bringing world-class products, reaffirmed by the encouraging response.</li>
      <li>eHome products are user-friendly, easy to operate, make your life more enjoyable, and truly make you love your home.</li>
      <li>BALTRA Appliances enjoy wide patronage of customers in the overseas market, including NEPAL, BHUTAN, and other southeastern countries.</li>
    </ul>
  </div>
  <div className="flex justify-center items-center w-full md:w-1/2 mb-6 md:mb-0">
    <img
      src={logo}
      alt="eHome Logo"
      className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-300"
      style={{ maxHeight: '500px' }} // Adjust maxHeight as needed
    />
  </div>
</div>

        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <FooterComponent />
        </div>
      </footer>
    </>
  );
}

export default About;
