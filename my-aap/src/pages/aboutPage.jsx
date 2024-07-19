import React from "react";
import FooterComponent from "../FooterComponent/footerComponent";
import logo from "../img/logo.png";
import ehomevideo from "../img/ehomevideo.mp4";

function About() {
  return (
    <>
      <div className="w-full border-solid border-2 rounded-3xl border-red-500 mb-4">
        <div className="relative">
          <video
            src={ehomevideo}
            autoPlay
            muted
            loop
            alt="About Us"
            className="w-full h-56 object-cover"
          />
          <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold text-red-600">
            About Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex  flex-col-reverse md:flex-row-reverse items-stretch justify-center w-full">
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={logo}
              alt="eHome Logo"
              className="ml-1 w-full h-full object-cover rounded-lg shadow-lg"
              style={{ maxHeight: '500px' }} // Adjust maxHeight as needed
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 border-solid border-2 rounded-3xl border-red-500">
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full h-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-600">About eHome</h1>
              <p className="text-base md:text-lg mb-4">
                eHome started its operations in 1994 from Nepal. After reaching the pinnacle of success in Nepal, the operations were expanded to Indian markets in the year 2005. The company has become a leading name in Glassware, Kitchenware, and Electrical Appliances.
              </p>
              <ul className="text-left list-disc list-inside mb-4">
                <li className="mb-2">Total and thorough customer satisfaction with the assistance of our existing 250+ Distributors and 5000+ Dealers.</li>
                <li className="mb-2">Advanced manufacturing techniques and equipment.</li>
                <li className="mb-2">Own in-house Electrical & Physical Testing Labs equipped with the latest, modern, and sophisticated equipment.</li>
                <li className="mb-2">Approved by various quality institutions including ISI, CE, and ISO.</li>
                <li className="mb-2">Commitment to quality with dedication to bringing world-class products, reaffirmed by the encouraging response.</li>
                <li className="mb-2">eHome products are user-friendly, easy to operate, make your life more enjoyable, and truly make you love your home.</li>
                <li>BALTRA Appliances enjoy wide patronage of customers in the overseas market, including NEPAL, BHUTAN, and other southeastern countries.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <FooterComponent />
        </div>
      </footer>
    </>
  );
}

export default About;
