import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader,
  AlertCircle,
  Guitar,
  Music,
  DollarSign,
  Package,
  ShoppingCart,
  Ruler,
  Palette,
} from "lucide-react";

const CategoryPage = ({ category }) => {
  // Get category from props instead of useParams
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get proper category display name
  const getCategoryName = () => {
    switch (category) {
      case "genser":
        return "Gensere";
      case "tskjorte":
        return "T-skjorter";
      default:
        return category;
    }
  };

  // Format currency with NOK symbol
  const formatPrice = (price) => {
    return `${price} kr`;
  };

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

  // Get appropriate icon for category
  const getCategoryIcon = () => {
    return <Guitar className="text-[#9370DB] mr-4" size={32} />;
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#E0E0E0] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center">
            {getCategoryIcon()}
            <h1 className="text-4xl font-bold text-[#9370DB] mb-4 md:mb-0 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-[#8B0000]">
              {getCategoryName()}
            </h1>
          </div>
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
            {/* Guitar pick spinner */}
            <div className="relative w-16 h-16 animate-spin mb-4">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#8A2BE2]">
                <path
                  fill="currentColor"
                  d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.97,11.43 5.68,13.05 6.87,14.25L12,19.5L17.13,14.25C18.32,13.05 19.03,11.43 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8Z"
                />
              </svg>
            </div>
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
            <Music size={48} className="mx-auto mb-4 text-[#C0C0C0]" />
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
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-[#8A2BE2] text-white text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-[#9370DB] group-hover:text-[#8A2BE2] transition-colors duration-300">
                    {product.title}
                  </h2>

                  <p className="text-[#D3D3D3] mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Display product sizes and colors */}
                  {(product.sizes && product.sizes.length > 0) ||
                  (product.colors && product.colors.length > 0) ? (
                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-[#C0C0C0]">
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex items-center">
                          <Ruler size={12} className="mr-1" />
                          <span>{product.sizes.join(", ")}</span>
                        </div>
                      )}

                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center ml-2">
                          <Palette size={12} className="mr-1" />
                          <span>{product.colors.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  ) : null}

                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-[#333333] rounded-full text-sm text-[#00BFFF]">
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>

                    {/* Price with possible discount */}
                    <div className="text-right">
                      {product.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[#00BFFF] font-bold">
                            {formatPrice(product.discountPrice)}
                          </span>
                          <span className="text-[#777777] text-xs line-through">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-[#E0E0E0]">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock status and Buy button */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xs">
                      {product.stock <= 0 ? (
                        <span className="text-[#8B0000] flex items-center">
                          <Package size={14} className="mr-1" />
                          Utsolgt
                        </span>
                      ) : product.stock < 5 ? (
                        <span className="text-[#8B0000] flex items-center">
                          <Package size={14} className="mr-1" />
                          Få på lager
                        </span>
                      ) : (
                        <span className="text-[#00BFFF] flex items-center">
                          <Package size={14} className="mr-1" />
                          På lager
                        </span>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-[#333333] hover:bg-[#8A2BE2] text-white rounded uppercase text-xs font-bold tracking-wider transition-colors duration-300 flex items-center">
                      <ShoppingCart size={14} className="mr-1" />
                      Se produkt
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
