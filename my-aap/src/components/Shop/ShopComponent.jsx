import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/cartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get('http://localhost:5000/api/category/all');
        setCategories(categoriesResponse.data.categories.map(cat => ({
          id: cat._id,
          name: cat.name
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearchTerm && matchesCategory;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart'); // Redirect to cart after adding item
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded-md w-full max-w-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="border p-2 rounded-md ml-4"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product._id} className="bg-white p-4 shadow-md rounded-md">
              <img
                src={product.productImage || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="mb-2">${product.price.toFixed(2)}</p>
              <button
                className="bg-black text-white p-2 rounded-md w-full"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
