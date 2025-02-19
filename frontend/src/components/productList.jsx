import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://pactos-2.onrender.com/api/products"
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMore = (productid) => {
    navigate(`/details/${productid}`);
  };

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

  return (
    <div className="h-full w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="h-[28rem] sm:h-[32rem] bg-teal-950 rounded-3xl flex flex-col justify-end items-center pb-10 px-6 gap-32 sm:gap-28 text-center">
        <h1 className="font-bold text-4xl sm:text-6xl text-white w-full sm:w-[60%]">
          Your Marketplace, Your Way
        </h1>
        <p className="font-light text-lg sm:text-2xl text-teal-500 w-full sm:w-[60%]">
          Shop, Sell, Connect!
        </p>
      </div>

      {/* Products Section */}
      <div className="px-4 sm:px-10">
        <h2 className="text-4xl sm:text-5xl font-semibold text-teal-950 mt-10 sm:mt-14 text-center sm:text-left">
          Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-teal-950 font-semibold mt-4">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-teal-950 shadow rounded-2xl overflow-hidden hover:shadow-xl transition-shadow p-4 sm:p-5"
              >
                {product.imageurl && (
                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className="w-full h-44 sm:h-52 object-cover rounded-xl"
                  />
                )}
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between text-white text-xl sm:text-2xl font-semibold">
                    <h2 className="truncate">{product.name}</h2>
                    <p>${product.price}</p>
                  </div>
                  <p className="text-teal-400 text-sm sm:text-md mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <button
                    className="w-full bg-teal-500 text-teal-950 font-semibold py-2 mt-4 rounded-lg cursor-pointer transition hover:bg-teal-400"
                    onClick={() => handleMore(product.id)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
