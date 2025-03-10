import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, RefreshCw, ShoppingBag } from "lucide-react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        { withCredentials: true }
      );
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Kunne ikke hente produkter");
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    navigate("/products/create");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Våre Produkter
        </h1>
        <button
          onClick={handleCreateProduct}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
        >
          <PlusCircle size={18} />
          Nytt Produkt
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48">
          <RefreshCw size={24} className="text-gray-500 animate-spin mb-2" />
          <p className="text-gray-600">Laster produkter...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8 h-64">
          <ShoppingBag size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg mb-2">Ingen produkter funnet</p>
          <p className="text-gray-500 text-center">
            Klikk på "Nytt Produkt" for å legge til et produkt
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <span className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                  {product.category === "genser" ? "Genser" : "T-skjorte"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
