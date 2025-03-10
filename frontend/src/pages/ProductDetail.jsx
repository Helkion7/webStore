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
    <div>
      <button onClick={() => navigate(-1)}>
        <ChevronLeft size={16} />
        <span>Tilbake</span>
      </button>

      {loading ? (
        <div>
          <div></div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : product ? (
        <div>
          <div>
            <img src={product.imageUrl} alt={product.title} />
          </div>

          <div>
            <h1>{product.title}</h1>
            <div>
              <span>
                {product.category === "genser" ? "Genser" : "T-skjorte"}
              </span>
            </div>
            <p>{product.description}</p>

            <div>
              <h2>Antall</h2>
              <div>
                <button onClick={decreaseQuantity} aria-label="Reduser antall">
                  <Minus size={16} />
                </button>
                <div>{quantity}</div>
                <button onClick={increaseQuantity} aria-label="Øk antall">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button onClick={addToCart}>
              <ShoppingCart size={18} />
              Legg i handlekurv
            </button>

            <div>
              <Link to={`/${product.category}`}>
                Se flere{" "}
                {product.category === "genser" ? "gensere" : "t-skjorter"}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Produkt ikke funnet.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
