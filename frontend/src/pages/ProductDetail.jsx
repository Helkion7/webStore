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
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        <ChevronLeft size={16} />
        <span>Tilbake</span>
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                {product.category === "genser" ? "Genser" : "T-skjorte"}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Antall</h2>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 border border-gray-300 rounded-l-md"
                  aria-label="Reduser antall"
                >
                  <Minus size={16} />
                </button>
                <div className="px-4 py-2 border-t border-b border-gray-300 text-center w-16">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="p-2 border border-gray-300 rounded-r-md"
                  aria-label="Øk antall"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition"
            >
              <ShoppingCart className="mr-2" size={18} />
              Legg i handlekurv
            </button>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to={`/${product.category}`}
                className="text-blue-600 hover:underline"
              >
                Se flere{" "}
                {product.category === "genser" ? "gensere" : "t-skjorter"}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-gray-100 rounded-lg text-center">
          <p className="text-lg text-gray-700">Produkt ikke funnet.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
