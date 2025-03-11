import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PlusCircle,
  RefreshCw,
  ShoppingBag,
  Guitar,
  Edit,
  Trash2,
  DollarSign,
  Package,
  Star,
  Filter,
  AlertCircle,
  Ruler,
  Palette,
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

  // Format currency with NOK symbol
  const formatPrice = (price) => {
    return `${price} kr`;
  };

  // Determine stock status display
  const getStockStatus = (stock) => {
    if (stock <= 0) {
      return (
        <span className="text-[#8B0000] text-xs flex items-center">
          <Package size={14} className="mr-1" />
          Utsolgt
        </span>
      );
    } else if (stock < 5) {
      return (
        <span className="text-[#8B0000] text-xs flex items-center">
          <Package size={14} className="mr-1" />
          Få på lager
        </span>
      );
    } else {
      return (
        <span className="text-[#00BFFF] text-xs flex items-center">
          <Package size={14} className="mr-1" />
          På lager
        </span>
      );
    }
  };

  // Handle product deletion (placeholder for now)
  const handleDeleteProduct = (productId) => {
    // Show confirmation dialog
    if (window.confirm("Er du sikker på at du vil slette dette produktet?")) {
      // TODO: Implement actual deletion via API
      console.log(`Delete product with ID: ${productId}`);
      // Then refresh products
      fetchProducts();
    }
  };

  // Handle editing a product
  const handleEditProduct = (productId) => {
    navigate(`/products/edit/${productId}`);
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => {}}
              className="mt-4 sm:mt-0 px-4 py-2 flex items-center border border-[#663399] rounded-md text-[#C0C0C0] hover:bg-[#333333] transition-all duration-300"
            >
              <Filter size={16} className="mr-2 text-[#9370DB]" />
              <span>Filter</span>
            </button>
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
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#8A2BE2] to-[#00BFFF]"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Custom guitar pick loader */}
            <div className="relative w-16 h-16 animate-spin mb-6">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#8A2BE2]">
                <path
                  fill="currentColor"
                  d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.97,11.43 5.68,13.05 6.87,14.25L12,19.5L17.13,14.25C18.32,13.05 19.03,11.43 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8Z"
                />
              </svg>
            </div>
            <p className="text-xl text-[#9370DB]">Laster produkter...</p>
          </div>
        ) : error ? (
          <div className="bg-[#2D2D2D] border-l-4 border-[#8B0000] p-6 rounded-lg flex items-center">
            <AlertCircle className="text-[#8B0000] mr-4" size={24} />
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
                <div className="h-56 overflow-hidden relative">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-[#8A2BE2] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Star size={12} className="mr-1" fill="#FFFFFF" />
                        Featured
                      </div>
                    )}
                  </Link>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <Link to={`/product/${product._id}`} className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-[#9370DB] hover:text-[#8A2BE2] transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-[#D3D3D3] mb-4 flex-grow line-clamp-2">
                      {product.description}
                    </p>
                  </Link>

                  {/* Display product sizes and colors */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex items-center text-xs text-[#C0C0C0]">
                        <Ruler size={12} className="mr-1" />
                        {product.sizes.join(", ")}
                      </div>
                    )}

                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center text-xs text-[#C0C0C0] ml-3">
                        <Palette size={12} className="mr-1" />
                        {product.colors.join(", ")}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-[#333333] rounded-full text-sm text-[#00BFFF]">
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>
                    <div className="flex items-center">
                      <DollarSign size={14} className="text-[#9370DB] mr-1" />
                      {product.discountPrice ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[#00BFFF]">
                            {formatPrice(product.discountPrice)}
                          </span>
                          <span className="text-xs line-through text-[#777777]">
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

                  <div className="flex justify-between items-center">
                    {getStockStatus(product.stock)}

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product._id)}
                        className="p-2 bg-[#663399] rounded hover:bg-[#8A2BE2] transition-colors hover:shadow-[0_0_8px_rgba(138,43,226,0.5)]"
                      >
                        <Edit size={18} className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 bg-[#8B0000] rounded hover:bg-red-700 transition-colors hover:shadow-[0_0_8px_rgba(139,0,0,0.5)]"
                      >
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
