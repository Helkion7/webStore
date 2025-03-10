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
    <div>
      <div>
        <h1>Våre Produkter</h1>
        <button onClick={handleCreateProduct}>
          <PlusCircle size={18} />
          Nytt Produkt
        </button>
      </div>

      {loading ? (
        <div>
          <RefreshCw size={24} />
          <p>Laster produkter...</p>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : products.length === 0 ? (
        <div>
          <ShoppingBag size={48} />
          <p>Ingen produkter funnet</p>
          <p>Klikk på "Nytt Produkt" for å legge til et produkt</p>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <div>
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span>
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
