import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      navigate("/emailform");
      return;
    }

    const fetchOrders = async () => {
      try {
        // Use the "params" key to pass query parameters.
        const response = await axios.get("http://localhost:3000/api/orders", {
          params: {
            buyeremail: email,
          },
        });
        console.log(response);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to retrieve orders.");
      }
    };

    fetchOrders();
  }, [email, navigate]);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-teal-900 text-3xl sm:text-5xl font-bold text-center sm:text-left">
          {/* On mobile, display "Hello Shopper", and on larger screens display the email */}
          <span className="block sm:hidden">Hello Shopper</span>
          <span className="hidden sm:block">Hi, {email}</span>
        </div>
        <button
          className="mt-5 sm:mt-0 w-full sm:w-auto px-10 py-3 bg-teal-900 text-white font-medium text-xl rounded-2xl cursor-pointer"
          onClick={() => navigate("/productform")}
        >
          Add Product
        </button>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-teal-950 text-center sm:text-left">
          My Orders
        </h2>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <ul className="mt-4 space-y-4">
          {orders.length > 0
            ? orders.map((order) => (
                <li key={order.id} className="border p-4 rounded-md">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="space-y-1">
                      <p>
                        <span className="font-semibold">Product ID:</span>{" "}
                        {order.productid}
                      </p>
                      <p>
                        <span className="font-semibold">Buyer Name:</span>{" "}
                        {order.buyername}
                      </p>
                      <p>
                        <span className="font-semibold">Buyer Email:</span>{" "}
                        {order.buyeremail}
                      </p>
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {order.buyeraddress}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <p className="text-green-600 font-semibold">
                        {order.status}
                      </p>
                      {order.createdat && (
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdat).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))
            : !error && (
                <p className="text-gray-600 text-center">No orders found.</p>
              )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
