import React, { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductComponent = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/products");
      console.log("API Response:", response);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/api/products/${editingProduct._id}`,
        editingProduct
      );
      toast.success(response.data.msg);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.msg);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete product.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Manage Products
      </h1>
      <ToastContainer />
      {editingProduct && (
        <form
          onSubmit={handleUpdate}
          className="mb-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Edit Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-600">Brand</label>
              <input
                type="text"
                name="brand"
                value={editingProduct.brand}
                onChange={handleInputChange}
                placeholder="Enter brand"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-600">Price</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-600">
                Count in Stock
              </label>
              <input
                type="number"
                name="countInStock"
                value={editingProduct.countInStock}
                onChange={handleInputChange}
                placeholder="Enter stock count"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-2">
              <label className="mb-2 font-medium text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Product
          </button>
        </form>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Product List
        </h2>
        <ul className="divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map((product) => (
              <li
                key={product._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 mb-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 w-full p-4">
                  <div>
                    <p className="font-semibold text-gray-600">Product Name</p>
                    <p className="text-gray-800">{product.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Brand</p>
                    <p className="text-gray-800">{product.brand}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Price</p>
                    <p className="text-gray-800">${product.price}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">In Stock</p>
                    <p className="text-gray-800">{product.countInStock}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Rating</p>
                    <p className="text-gray-800">{product.rating}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Reviews</p>
                    <p className="text-gray-800">{product.numReviews}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <p className="font-semibold text-gray-600">Description</p>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                </div>
                <div className="flex space-x-4 justify-end sm:justify-start p-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <AiFillEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <AiFillDelete size={24} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductComponent;
