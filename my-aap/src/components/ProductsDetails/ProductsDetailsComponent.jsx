import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white shadow rounded-lg p-4">
        <img
          src={product.productImage}
          alt={product.name}
          className="h-60 w-full object-cover mb-4"
        />
        <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-600 mt-2">Brand: {product.brand}</p>
        <p className="text-gray-600 mt-2">Rating: {product.rating}</p>
        <p className="text-gray-600 mt-2">Reviews: {product.numReviews}</p>
        <p className="text-gray-600 mt-2">Stock: {product.countInStock}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
