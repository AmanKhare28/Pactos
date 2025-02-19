import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  // Pre-fill the email field from localStorage (if available)
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // POST request to the product creation endpoint
      const response = await axios.post("http://localhost:3000/api/products", {
        name,
        description,
        price: Number(price),
        imageurl,
        email,
      });
      console.log("Product created:", response.data);
      setSuccess("Product created successfully!");
      // Optionally navigate to another page, e.g., product list or profile page
      navigate("/profile");
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Failed to create product.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageurl" className="block text-lg font-medium mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="imageurl"
            className="w-full p-2 border border-gray-300 rounded"
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-semibold rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
