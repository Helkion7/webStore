import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

  // Rest of your component remains the same
  return (
    <div>
      <div>
        <h1>{categoryName}</h1>
        <Link to="/">Tilbake til forsiden</Link>
      </div>

      {loading ? (
        <div>
          <div></div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : products.length === 0 ? (
        <div>
          <p>Ingen produkter funnet for denne kategorien.</p>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div>
                <div>
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <div>
                    <span>
                      {product.category === "genser" ? "Genser" : "T-skjorte"}
                    </span>
                    <button>Se produkt</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
