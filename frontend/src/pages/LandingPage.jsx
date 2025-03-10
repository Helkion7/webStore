import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [newestProducts, setNewestProducts] = useState([]);
  const [categories, setCategories] = useState([
    { name: "Genser", id: "genser" },
    { name: "T-skjorte", id: "tskjorte" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/newest`,
          { withCredentials: true }
        );
        setNewestProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching newest products:", error);
        setError("Kunne ikke hente de nyeste produktene");
        setLoading(false);
      }
    };

    fetchNewestProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Kategorier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/${category.id}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-gray-600 mt-2">
                Se alle {category.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Nyeste Produkter</h2>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newestProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow group-hover:shadow-lg transition duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          Finn din favoritt rock stil og kle deg i stil med bandene du digger!
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
