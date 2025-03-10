import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, Type, Image, Save, AlertCircle, ChevronLeft } from "lucide-react";
import axios from "axios";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Character count for description
  const descriptionLength = description.length;
  const maxLength = 100;

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAdmin = async () => {
      try {
        // Normally you'd have an endpoint to check user status
        // For now, we'll assume you have an endpoint that returns user info
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (response.data.user && response.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setError("Du må være logget inn som admin for å legge til produkter");
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        setError("Du må være logget inn som admin for å legge til produkter");
        setTimeout(() => navigate("/"), 3000);
      }
    };

    checkAdmin();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Reset messages
    setMsg("");
    setError("");

    // Validate description length
    if (description.length > maxLength) {
      setError(`Beskrivelse kan ikke overstige ${maxLength} tegn`);
      return;
    }

    // Validate all fields
    if (!title || !description || !imageUrl || !category) {
      setError("Alle feltene må fylles ut");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          title,
          description,
          imageUrl,
          category: category.toLowerCase(),
        },
        {
          withCredentials: true,
        }
      );

      setIsLoading(false);
      setMsg(response.data.msg || "Produkt opprettet");

      if (response.data.success) {
        // Clear form after successful creation
        setTitle("");
        setDescription("");
        setImageUrl("");
        setCategory("");

        // Navigate to products page after delay
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg || "Kunne ikke opprette produkt");
      console.error("Error creating product:", error);
    }
  }

  // Preview image
  const imagePreview = imageUrl ? (
    <div className="mt-2 border rounded-md overflow-hidden">
      <img
        src={imageUrl}
        alt="Forhåndsvisning"
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/300x150?text=Ugyldig+bildeadresse";
        }}
      />
    </div>
  ) : null;

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 bg-red-100 text-red-800 p-3 rounded-md">
          <AlertCircle size={18} />
          <p>{error || "Sjekker admin-status..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!isAdmin ? (
        <div>
          <div>
            <AlertCircle size={18} />
            <p>{error || "Sjekker admin-status..."}</p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1>Opprett Nytt Produkt</h1>
            <button onClick={() => navigate("/")}>
              <ChevronLeft size={16} />
              <span>Tilbake</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <Type />
              <input
                type="text"
                placeholder="Tittel"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <div>
                <Tag />
                <textarea
                  placeholder="Beskrivelse (maks 100 tegn)"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={maxLength}
                />
              </div>
              <div>
                {descriptionLength}/{maxLength} tegn
              </div>
            </div>

            <div>
              <div>
                <Image />
                <input
                  type="url"
                  placeholder="Bilde URL"
                  value={imageUrl}
                  required
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              {imagePreview}
            </div>

            <div>
              <Tag />
              <select
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Velg kategori</option>
                <option value="genser">Genser</option>
                <option value="tskjorte">T-skjorte</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div></div>
                  Lagrer...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Lagre Produkt
                </>
              )}
            </button>
          </form>

          {error && (
            <div>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {msg && <div>{msg}</div>}
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
