import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.response?.data?.msg || 'Error fetching data');
      } finally {
        setLoading(false);
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

  const addToCart = async (product) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.post(
        'http://localhost:5000/api/cart',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: ` ${authToken}` } }
      );
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-xl mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shop Our Products</h1>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-3 rounded-lg w-full max-w-md shadow-sm focus:ring focus:ring-gray-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="border p-3 rounded-lg w-full md:w-auto shadow-sm focus:ring focus:ring-gray-300"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div 
              key={product._id} 
              className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="w-full h-64 overflow-hidden rounded-lg mb-4 cursor-pointer">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  onClick={() => openImageModal(product.productImage)}
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              <p className="text-xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
              <button
                className="bg-gray-800 text-white p-3 rounded-lg w-full hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <div className="absolute top-2 right-2 bg-yellow-500 text-xs font-bold text-white px-2 py-1 rounded-lg">
                New
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full-Screen Image Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={closeImageModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      >
        {selectedImage && (
          <Dialog.Panel className="relative">
            <img
              src={selectedImage}
              alt="Product"
              className="max-w-full max-h-full rounded-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white text-xl focus:outline-none"
            >
              &times;
            </button>
          </Dialog.Panel>
        )}
      </Dialog>
    </div>
  );
};

export default Shop;
