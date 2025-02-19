import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams(); // Ensure your route uses :productId
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product with id:", productId);
        const response = await axios.get(
          `https://pactos-2.onrender.com/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        <p className="text-lg text-teal-700 font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        <p className="text-lg text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        <p className="text-lg text-teal-700 font-semibold">No product found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Buttons */}
      <div className="flex justify-between mb-4">
        <button
          className="bg-teal-500 text-teal-950 px-3 py-2 rounded-md transition hover:bg-teal-400"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-md overflow-hidden">
        {product.imageurl && (
          <img
            src={product.imageurl}
            alt={product.name}
            className="w-full sm:w-1/2 object-cover"
          />
        )}
        <div className="p-4 sm:p-6 flex flex-col justify-between w-full">
          <div>
            {/* Name & Price */}
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <h1 className="text-3xl sm:text-7xl font-semibold text-teal-900 mb-2 sm:mb-4">
                {product.name}
              </h1>
              <p className="text-2xl sm:text-5xl font-semibold text-black mb-2 sm:mb-4">
                ${product.price}
              </p>
            </div>
            {/* Description */}
            <p className="text-teal-700 mb-4 text-base sm:text-lg">
              {product.description}
            </p>
          </div>
          {/* Order Now Button */}
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md transition hover:bg-teal-400 cursor-pointer mt-4 sm:mt-0"
            onClick={() => navigate(`/orderform/${productId}`)}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
