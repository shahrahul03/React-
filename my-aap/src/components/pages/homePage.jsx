import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../FooterComponent/footerComponent';
import img from "../../img/productsimg.jpg"
import kitchen1 from "../../img/kitchen1.jpg"
import kitchen2 from "../../img/kitchen2.jpg"
import kitchen3 from "../../img/kitchen3.jpg"
import heater from "../../img/heater1.jpg"
import productimg from "../../img/productsimg.jpg"
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products'); // Adjust the URL as needed
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleButtonClick = () => {
    navigate('/shop');
  };

  return (
    <div>
      
        <section className="bg-red-700 text-white py-16 mt-0">
          <div className="w-full mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Modern Home Appliances</h1>
            <p className="mb-8">Your one step towards the future.</p>
            <div className="space-x-4">
              <button 
                onClick={handleButtonClick} 
                className="bg-yellow-500 text-black px-6 py-3 rounded"
              >
                Shop Now
              </button>
              <button 
                onClick={handleButtonClick}
                className="border border-white px-6 py-3 rounded"
              >
                Explore
              </button>
            </div>
          </div>
          <div className="container w-full mx-auto mt-8">
            <img 
              src={productimg} 
              alt="Home Appliances" 
              className="mx-auto" 
            />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">One Place for All Your Home Solutions</h2>
            <p className="mb-8">Discover a wide range of home appliances that fit your needs.</p>
            <button 
              onClick={handleButtonClick}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Explore
            </button>
          </div>
          <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <div key={product._id} className="text-center">
                <img 
                  src={product.productImage} 
                  alt={product.name} 
                  className="mx-auto mb-4" 
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="mb-8">We offer a wide range of high-quality home appliances with excellent customer service.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <i className="icon-shipping mb-2 text-2xl"></i>
                  <h3 className="text-lg font-bold">Fast & Free Shipping</h3>
                  <p>Get your products delivered to your doorstep quickly and for free.</p>
                </div>
                <div className="text-center">
                  <i className="icon-shopping mb-2 text-2xl"></i>
                  <h3 className="text-lg font-bold">Easy to Shop</h3>
                  <p>Enjoy a seamless and convenient shopping experience.</p>
                </div>
                <div className="text-center">
                  <i className="icon-support mb-2 text-2xl"></i>
                  <h3 className="text-lg font-bold">24/7 Support</h3>
                  <p>Our support team is available round the clock to assist you.</p>
                </div>
                <div className="text-center">
                  <i className="icon-returns mb-2 text-2xl"></i>
                  <h3 className="text-lg font-bold">Hassle-Free Returns</h3>
                  <p>Easy and quick returns for your convenience.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img className='w-full'
                src={img} 
                alt="Why Choose Us" 
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={kitchen1} 
                alt="Kitchen Appliance 1" 
                className="rounded-lg" 
              />
              <img 
                src={kitchen2}
                alt="Kitchen Appliance 2" 
                className="rounded-lg" 
              />
              <img 
                src={kitchen3}
                alt="Kitchen Appliance 3" 
                className="rounded-lg" 
              />
              <img 
                src={heater} 
                alt="Kitchen Appliance 4" 
                className="rounded-lg" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Modern Kitchen Appliances</h2>
              <p className="mb-4">Enhance your kitchen with our latest range of appliances designed for modern homes.</p>
              <ul className="list-disc list-inside mb-4">
                <li>High efficiency and performance</li>
                <li>Energy-saving technology</li>
                <li>Innovative and stylish designs</li>
              </ul>
              <button 
                onClick={handleButtonClick}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Explore
              </button>
            </div>
          </div>
        </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
