import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader, AlertCircle, Guitar } from "lucide-react";

const CategoryPage = ({ category }) => {
  // Get category from props instead of useParams
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryName = category === "genser" ? "Gensere" : "T-skjorter";

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!category) {
        setError("Kategori mangler");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/category/${category}`,
          { withCredentials: true }
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products by category:", error);
        setError("Kunne ikke hente produkter for denne kategorien");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#E0E0E0] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-4xl font-bold text-[#9370DB] mb-4 md:mb-0 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-[#8B0000]">
            {categoryName}
          </h1>
          <Link
            to="/"
            className="group flex items-center text-[#C0C0C0] hover:text-[#9370DB] transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 group-hover:translate-x-[-4px] transition-transform" />
            <span className="border-b border-[#8B0000] pb-1">
              Tilbake til forsiden
            </span>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size={48} className="text-[#8A2BE2] animate-spin mb-4" />
            <div className="text-lg text-[#C0C0C0]">
              Laster inn produkter...
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#2D2D2D] border-l-4 border-[#8B0000] p-6 rounded-lg flex items-center">
            <AlertCircle className="text-[#8B0000] mr-4" size={24} />
            <p className="text-lg">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-[#2D2D2D] p-8 rounded-lg text-center">
            <Guitar size={48} className="mx-auto mb-4 text-[#C0C0C0]" />
            <p className="text-xl mb-2">
              Ingen produkter funnet for denne kategorien.
            </p>
            <p className="text-[#9370DB]">
              Sjekk tilbake senere for nye varer!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-gradient-to-br from-[#2D2D2D] to-[#333333] rounded-lg overflow-hidden border border-[#333333] hover:border-[#8A2BE2] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)]"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-[#9370DB] group-hover:text-[#8A2BE2] transition-colors duration-300">
                    {product.title}
                  </h2>
                  <p className="text-[#D3D3D3] mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-[#333333] rounded-full text-sm text-[#00BFFF]">
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>
                    <button className="px-4 py-2 bg-[#333333] hover:bg-[#8A2BE2] text-white rounded uppercase text-sm font-bold tracking-wider transition-colors duration-300 flex items-center">
                      Se produkt
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
