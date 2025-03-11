import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChevronLeft,
  Plus,
  Minus,
  DollarSign,
  Package,
  AlertCircle,
  Ruler,
  Palette,
} from "lucide-react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
          { withCredentials: true }
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Kunne ikke hente produktinformasjon");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    // Only allow increasing quantity if stock is available
    if (product && product.stock && quantity < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert("Vennligst velg størrelse");
      return;
    }

    if (!selectedColor) {
      alert("Vennligst velg farge");
      return;
    }

    // This would typically add the product to a cart state or storage
    alert(
      `${quantity} x ${product.title} (${selectedSize}, ${selectedColor}) lagt i handlekurven!`
    );
  };

  // Format currency with NOK symbol
  const formatPrice = (price) => {
    return `${price} kr`;
  };

  // Determine stock status display
  const getStockStatus = () => {
    if (!product || product.stock === undefined) return null;

    if (product.stock <= 0) {
      return (
        <span className="inline-flex items-center text-[#8B0000] font-semibold">
          <AlertCircle size={16} className="mr-1" />
          Utsolgt
        </span>
      );
    } else if (product.stock < 5) {
      return (
        <span className="inline-flex items-center text-[#8B0000] font-semibold">
          <Package size={16} className="mr-1" />
          Kun {product.stock} igjen på lager!
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center text-[#00BFFF] font-semibold">
          <Package size={16} className="mr-1" />
          På lager
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#E0E0E0] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back button with rock styling */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-8 px-4 py-2 bg-[#2D2D2D] rounded-md 
          border border-[#663399] hover:bg-[#333333] transition-colors duration-300
          hover:shadow-[0_0_10px_rgba(138,43,226,0.5)]"
        >
          <ChevronLeft size={20} className="text-[#9370DB] mr-2" />
          <span>Tilbake</span>
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            {/* Rock-themed guitar pick loading spinner */}
            <div className="relative w-16 h-16 animate-spin">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#8A2BE2]">
                <path
                  fill="currentColor"
                  d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.97,11.43 5.68,13.05 6.87,14.25L12,19.5L17.13,14.25C18.32,13.05 19.03,11.43 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8Z"
                />
              </svg>
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#8B0000]/20 border border-[#8B0000] p-6 rounded-lg text-center">
            <p className="text-xl font-bold">{error}</p>
          </div>
        ) : product ? (
          <div
            className="grid md:grid-cols-2 gap-8 bg-[#2D2D2D] rounded-lg overflow-hidden
            border border-[#333333] shadow-lg shadow-[#8A2BE2]/20"
          >
            {/* Product Image */}
            <div className="h-full overflow-hidden border-r border-[#333333] bg-[#333333]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#C0C0C0]">
                {product.title}
              </h1>

              {/* Category badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#663399] text-white text-sm font-semibold rounded-full">
                  {product.category === "genser" ? "Genser" : "T-skjorte"}
                </span>
              </div>

              {/* Price display with possible discount */}
              <div className="mb-4 flex items-center">
                <DollarSign size={20} className="text-[#9370DB] mr-2" />
                <div>
                  {product.discountPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#00BFFF]">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span className="text-lg text-[#D3D3D3] line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-[#C0C0C0]">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock status */}
              <div className="mb-4">{getStockStatus()}</div>

              {/* Product Description */}
              <p className="text-[#D3D3D3] mb-6">{product.description}</p>

              {/* Sizes selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h2 className="flex items-center text-xl font-bold mb-3 text-[#9370DB]">
                    <Ruler size={18} className="mr-2" />
                    Størrelse
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`w-12 h-12 flex items-center justify-center rounded-md transition-all duration-200 
                        ${
                          selectedSize === size
                            ? "bg-[#663399] text-white border-2 border-[#8A2BE2] shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                            : "bg-[#333333] text-[#C0C0C0] border border-[#444444] hover:bg-[#3D3D3D]"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <div className="mt-2 text-sm text-[#C0C0C0]">
                      Valgt størrelse:{" "}
                      <span className="font-bold text-[#9370DB]">
                        {selectedSize}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Colors selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h2 className="flex items-center text-xl font-bold mb-3 text-[#9370DB]">
                    <Palette size={18} className="mr-2" />
                    Farge
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-2 flex items-center justify-center rounded-md transition-all duration-200 
                        ${
                          selectedColor === color
                            ? "bg-[#663399] text-white border-2 border-[#8A2BE2] shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                            : "bg-[#333333] text-[#C0C0C0] border border-[#444444] hover:bg-[#3D3D3D]"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  {selectedColor && (
                    <div className="mt-2 text-sm text-[#C0C0C0]">
                      Valgt farge:{" "}
                      <span className="font-bold text-[#9370DB]">
                        {selectedColor}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector - only show if product has stock */}
              {product.stock > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-3 text-[#9370DB]">
                    Antall
                  </h2>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      aria-label="Reduser antall"
                      className="w-10 h-10 flex items-center justify-center bg-[#333333] 
                      border border-[#663399] rounded-l-md hover:bg-[#8A2BE2]/20 transition-colors duration-300"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} className="text-[#9370DB]" />
                    </button>
                    <div className="w-12 h-10 flex items-center justify-center bg-[#333333] border-t border-b border-[#663399] text-lg font-bold">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      aria-label="Øk antall"
                      className="w-10 h-10 flex items-center justify-center bg-[#333333] 
                      border border-[#663399] rounded-r-md hover:bg-[#8A2BE2]/20 transition-colors duration-300"
                      disabled={product.stock && quantity >= product.stock}
                    >
                      <Plus size={18} className="text-[#9370DB]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Add to cart button - disabled if out of stock */}
              <button
                onClick={addToCart}
                disabled={!product.stock || product.stock <= 0}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-md
                font-bold mb-6 transition-all duration-300 
                ${
                  product.stock > 0
                    ? "bg-[#663399] text-white hover:bg-[#8A2BE2] shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_15px_rgba(138,43,226,0.5)]"
                    : "bg-[#333333] text-[#666666] cursor-not-allowed opacity-60"
                }`}
              >
                <ShoppingCart size={20} />
                {product.stock > 0 ? "Legg i handlekurv" : "Utsolgt"}
              </button>

              {/* See more link */}
              <div className="mt-auto pt-4 border-t border-[#333333]">
                <Link
                  to={`/${product.category}`}
                  className="text-[#00BFFF] hover:text-[#9370DB] transition-colors duration-300 
                  inline-flex items-center gap-1 hover:underline"
                >
                  <span>
                    Se flere{" "}
                    {product.category === "genser" ? "gensere" : "t-skjorter"}
                  </span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#2D2D2D] border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-xl">Produkt ikke funnet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
