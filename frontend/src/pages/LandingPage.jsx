import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <div>
      <div>
        <h2>Kategorier</h2>
        <div>
          {categories.map((category) => (
            <Link key={category.id} to={`/${category.id}`}>
              <h3>{category.name}</h3>
              <p>Se alle {category.name.toLowerCase()}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2>Nyeste Produkter</h2>
        {loading ? (
          <div>
            <div></div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            {newestProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div>
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
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>
          Finn din favoritt rock stil og kle deg i stil med bandene du digger!
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
