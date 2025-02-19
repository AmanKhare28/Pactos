import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 p-4">
      <div className="bg-white shadow-md rounded-md p-8 text-center">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">
          Order Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-teal-500 text-white px-6 py-2 rounded-md transition hover:bg-teal-600"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Success;
