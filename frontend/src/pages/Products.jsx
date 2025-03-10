import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  RefreshCw,
  ShoppingBag,
  Guitar,
  Edit,
  Trash2,
} from "lucide-react";
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
    <div className="min-h-screen bg-[#1E1E1E] text-[#E0E0E0] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header with rock-themed decoration */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#8B0000] pb-6 relative">
          <div className="flex items-center">
            <Guitar size={36} className="text-[#8A2BE2] mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] bg-clip-text text-transparent">
              Våre Produkter
            </h1>
          </div>
          {/* Amplifier-styled create button */}
          <button
            onClick={handleCreateProduct}
            className="mt-4 sm:mt-0 px-5 py-3 bg-[#333333] border-2 border-[#8A2BE2] rounded-md flex items-center hover:bg-[#3D3D3D] hover:shadow-[0_0_10px_rgba(138,43,226,0.5)] transition-all duration-300"
          >
            <PlusCircle size={18} className="mr-2 text-[#9370DB]" />
            <span className="font-bold tracking-wider uppercase">
              Nytt Produkt
            </span>
          </button>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#8A2BE2] to-[#00BFFF]"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Custom guitar pick loader */}
            <div className="relative w-16 h-16 animate-spin mb-6">
              <RefreshCw size={64} className="text-[#8A2BE2]" />
            </div>
            <p className="text-xl text-[#9370DB]">Laster produkter...</p>
          </div>
        ) : error ? (
          <div className="bg-[#2D2D2D] border-l-4 border-[#8B0000] p-6 rounded-lg">
            <p className="text-lg">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-gradient-to-b from-[#2D2D2D] to-[#333333] p-12 rounded-lg text-center shadow-lg border border-[#333333]">
            <ShoppingBag
              size={72}
              className="mx-auto mb-6 text-[#9370DB] opacity-70"
            />
            <p className="text-2xl mb-4 font-bold text-[#9370DB]">
              Ingen produkter funnet
            </p>
            <p className="text-[#D3D3D3] mb-6">
              Klikk på "Nytt Produkt" for å legge til et produkt
            </p>
            <div className="inline-block">
              <button
                onClick={handleCreateProduct}
                className="px-6 py-3 bg-[#8A2BE2] rounded-md text-white font-bold uppercase tracking-wider hover:bg-[#663399] transition-colors duration-300 flex items-center mx-auto"
              >
                <PlusCircle className="mr-2" size={20} />
                Nytt Produkt
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gradient-to-br from-[#2D2D2D] to-[#333333] rounded-lg overflow-hidden border border-[#333333] hover:border-[#8A2BE2] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)] flex flex-col"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-[#9370DB]">
                    {product.title}
                  </h3>
                  <p className="text-[#D3D3D3] mb-4 flex-grow line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-[#333333] rounded-full text-sm text-[#00BFFF]">
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-[#663399] rounded hover:bg-[#8A2BE2] transition-colors">
                        <Edit size={18} className="text-white" />
                      </button>
                      <button className="p-2 bg-[#8B0000] rounded hover:bg-red-700 transition-colors">
                        <Trash2 size={18} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
