import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the email in localStorage if it's provided
    if (email) {
      localStorage.setItem("email", email);
      // Redirect to home page or any other route
      navigate("/profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-50 p-4">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-teal-900 mb-6 text-center">
          Enter Your Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md transition hover:bg-teal-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
