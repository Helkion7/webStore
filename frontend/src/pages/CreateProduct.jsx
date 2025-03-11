import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  Type,
  Image,
  Save,
  AlertCircle,
  ChevronLeft,
  DollarSign,
  Package,
} from "lucide-react";
import axios from "axios";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([
    { name: "S", selected: false },
    { name: "M", selected: false },
    { name: "L", selected: false },
    { name: "XL", selected: false },
  ]);
  const [colors, setColors] = useState([
    { name: "Black", selected: false },
    { name: "White", selected: false },
    { name: "Blue", selected: false },
    { name: "Red", selected: false },
  ]);
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
    if (!title || !description || !imageUrl || !category || !price || !stock) {
      setError("Alle påkrevde feltene må fylles ut");
      return;
    }

    // Get selected sizes and colors
    const selectedSizes = sizes
      .filter((size) => size.selected)
      .map((size) => size.name);
    const selectedColors = colors
      .filter((color) => color.selected)
      .map((color) => color.name);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          title,
          description,
          imageUrl,
          category: category.toLowerCase(),
          price: Number(price),
          stock: Number(stock),
          sizes: selectedSizes,
          colors: selectedColors,
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
        setPrice("");
        setStock("");
        setSizes(sizes.map((size) => ({ ...size, selected: false })));
        setColors(colors.map((color) => ({ ...color, selected: false })));

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
    <div className="mt-4 border border-purple-700 rounded-md overflow-hidden">
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
      <div className="max-w-md mx-auto p-6 bg-[#2D2D2D] rounded-lg shadow-lg border border-[#8A2BE2] text-[#E0E0E0]">
        <div className="flex items-center gap-2 bg-[#8B0000] bg-opacity-20 text-[#E0E0E0] p-4 rounded-md border border-[#8B0000]">
          <AlertCircle size={18} className="text-[#8B0000]" />
          <p>{error || "Sjekker admin-status..."}</p>
        </div>
      </div>
    );
  }

  // Handle size selection
  const handleSizeToggle = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].selected = !updatedSizes[index].selected;
    setSizes(updatedSizes);
  };

  // Handle color selection
  const handleColorToggle = (index) => {
    const updatedColors = [...colors];
    updatedColors[index].selected = !updatedColors[index].selected;
    setColors(updatedColors);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-[#2D2D2D] rounded-lg shadow-lg border border-[#8A2BE2] p-6 text-[#E0E0E0]">
        <div className="flex justify-between items-center mb-8 border-b border-[#663399] pb-4">
          <h1 className="text-3xl font-bold text-[#9370DB] tracking-wide">
            Opprett Nytt Produkt
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#333333] hover:bg-[#444444] rounded-md transition-all duration-300 border border-[#8A2BE2] hover:shadow-[0_0_8px_rgba(138,43,226,0.6)]"
          >
            <ChevronLeft size={16} className="text-[#9370DB]" />
            <span>Tilbake</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9370DB]">
              <Type size={18} />
            </div>
            <input
              type="text"
              placeholder="Tittel"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200"
            />
          </div>

          <div>
            <div className="relative">
              <div className="absolute left-3 top-3 text-[#9370DB]">
                <Tag size={18} />
              </div>
              <textarea
                placeholder="Beskrivelse (maks 100 tegn)"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                maxLength={maxLength}
                className="w-full py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200 min-h-[100px] resize-y"
              />
            </div>
            <div className="flex justify-end mt-2 text-sm text-[#C0C0C0]">
              {descriptionLength}/{maxLength} tegn
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9370DB]">
                <DollarSign size={18} />
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Pris"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                className="w-full py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9370DB]">
                <Package size={18} />
              </div>
              <input
                type="number"
                step="1"
                min="0"
                placeholder="Lagerbeholdning"
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
                className="w-full py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9370DB]">
                <Image size={18} />
              </div>
              <input
                type="url"
                placeholder="Bilde URL"
                value={imageUrl}
                required
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200"
              />
            </div>
            {imagePreview}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9370DB]">
              <Tag size={18} />
            </div>
            <select
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200"
            >
              <option value="">Velg kategori</option>
              <option value="genser">Genser</option>
              <option value="tskjorte">T-skjorte</option>
            </select>
          </div>

          {/* Sizes section */}
          <div className="border border-[#444444] rounded-md p-4 bg-[#252525]">
            <h3 className="text-[#9370DB] font-bold mb-3">Størrelser</h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size, index) => (
                <label
                  key={size.name}
                  className={`flex items-center justify-center w-14 h-10 rounded-md cursor-pointer transition-all duration-200 ${
                    size.selected
                      ? "bg-[#663399] text-white border-2 border-[#8A2BE2] shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                      : "bg-[#333333] text-[#C0C0C0] border border-[#444444] hover:bg-[#444444]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={size.selected}
                    onChange={() => handleSizeToggle(index)}
                    className="hidden"
                  />
                  {size.name}
                </label>
              ))}
            </div>
          </div>

          {/* Colors section */}
          <div className="border border-[#444444] rounded-md p-4 bg-[#252525]">
            <h3 className="text-[#9370DB] font-bold mb-3">Farger</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color, index) => (
                <label
                  key={color.name}
                  className={`flex items-center justify-center px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                    color.selected
                      ? "bg-[#663399] text-white border-2 border-[#8A2BE2] shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                      : "bg-[#333333] text-[#C0C0C0] border border-[#444444] hover:bg-[#444444]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={color.selected}
                    onChange={() => handleColorToggle(index)}
                    className="hidden"
                  />
                  {color.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#663399] to-[#8A2BE2] rounded-md font-semibold hover:from-[#8A2BE2] hover:to-[#9370DB] transition-all duration-300 hover:shadow-[0_0_12px_rgba(138,43,226,0.8)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-[#E0E0E0] border-t-transparent rounded-full"></div>
                <span>Lagrer...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Lagre Produkt</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 flex items-center gap-2 bg-[#8B0000] bg-opacity-20 text-[#E0E0E0] p-4 rounded-md border border-[#8B0000]">
            <AlertCircle size={18} className="text-[#8B0000]" />
            <p>{error}</p>
          </div>
        )}

        {msg && (
          <div className="mt-6 flex items-center gap-2 bg-[#663399] bg-opacity-20 text-[#E0E0E0] p-4 rounded-md border border-[#663399]">
            <p>{msg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
