import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader, Music, Skull } from "lucide-react";

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
    <div className="bg-[#1E1E1E] text-[#E0E0E0] min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#2D2D2D] to-[#1E1E1E] p-6 mb-12">
        <div className="max-w-6xl mx-auto text-center py-16 relative overflow-hidden">
          <div className="absolute opacity-5 w-full h-full top-0 left-0 z-0">
            {/* Background guitar silhouette SVG would go here */}
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="currentColor"
                d="M19.59,3.41a2,2,0,0,0-2.83,0L14,6.17,10.17,2.34a2,2,0,0,0-2.83,2.83L11.17,9,8.59,11.59a2,2,0,0,0,0,2.83l1,1L5,20h2l4-4,1,1a2,2,0,0,0,2.83,0L17.41,14.41l3.76,3.76a2,2,0,0,0,2.83-2.83Z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#8A2BE2] drop-shadow-[0_0_10px_#8A2BE2] relative z-10">
            ROCK YOUR STYLE
          </h1>
          <p className="text-xl md:text-2xl text-[#D3D3D3] relative z-10">
            Authentic rock merch for authentic rock fans
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex items-center mb-6">
          <Music className="text-[#8A2BE2] mr-2" size={24} />
          <h2 className="text-2xl font-bold text-[#9370DB]">Kategorier</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/${category.id}`}
              className="bg-[#2D2D2D] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-[#333333] hover:border-[#8A2BE2] hover:shadow-[0_0_15px_rgba(138,43,226,0.3)] block"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#9370DB] mb-2">
                  {category.name}
                </h3>
                <p className="text-[#C0C0C0] flex items-center">
                  Se alle {category.name.toLowerCase()}
                  <svg
                    className="ml-2 w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 5L15.5 12L8.5 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newest Products Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex items-center mb-6">
          <Skull className="text-[#8A2BE2] mr-2" size={24} />
          <h2 className="text-2xl font-bold text-[#9370DB]">
            Nyeste Produkter
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin text-[#9370DB]">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#8B0000] text-white p-4 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newestProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group"
              >
                <div className="bg-[#2D2D2D] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)] border border-[#333333] group-hover:border-[#8A2BE2]">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#E0E0E0] mb-2 group-hover:text-[#9370DB] transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-[#C0C0C0] text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <span className="inline-block bg-[#333333] text-xs font-semibold py-1 px-2 rounded text-[#9370DB]">
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#333333] to-[#2D2D2D] rounded-lg p-8 text-center border border-[#663399]">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#E0E0E0]">
            Finn din favoritt <span className="text-[#8A2BE2]">rock stil</span>{" "}
            og kle deg i stil med bandene du digger!
          </h2>
          <Link
            to="/products"
            className="inline-block mt-6 bg-[#663399] hover:bg-[#8A2BE2] text-white font-bold py-3 px-8 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]"
          >
            Se alle produkter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
