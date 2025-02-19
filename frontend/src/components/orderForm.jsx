import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const { productId } = useParams(); // Assumes URL is /orderform/:productId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("email", formData.email);
      await axios.post("https://pactos-2.onrender.com/api/orders", {
        productid: productId,
        buyername: formData.name,
        buyeremail: formData.email,
        buyeraddress: formData.address,
      });
      // On success, redirect to the success screen
      navigate("/success");
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-50 p-4">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-teal-900 mb-6 text-center">
          Order Form
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-teal-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-teal-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-teal-700 font-medium mb-1"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your shipping address"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md transition hover:bg-teal-600"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
