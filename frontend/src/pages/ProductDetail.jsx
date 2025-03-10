import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronLeft, Plus, Minus } from "lucide-react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const addToCart = () => {
    // This would typically add the product to a cart state or storage
    alert(`${quantity} x ${product.title} lagt i handlekurven!`);
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
            {/* Rock-themed loading spinner */}
            <div className="w-16 h-16 border-t-4 border-b-4 border-[#8A2BE2] rounded-full animate-spin"></div>
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

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#663399] text-white text-sm font-semibold rounded-full">
                  {product.category === "genser" ? "Genser" : "T-skjorte"}
                </span>
              </div>

              <p className="text-[#D3D3D3] mb-8">{product.description}</p>

              {/* Quantity Selector */}
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
                  >
                    <Plus size={18} className="text-[#9370DB]" />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={addToCart}
                className="flex items-center justify-center gap-2 bg-[#663399] text-white py-3 px-6 rounded-md
                hover:bg-[#8A2BE2] transition-colors duration-300 mb-6 font-bold 
                shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_15px_rgba(138,43,226,0.5)]"
              >
                <ShoppingCart size={20} />
                Legg i handlekurv
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
