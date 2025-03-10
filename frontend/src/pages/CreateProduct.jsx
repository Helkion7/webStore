import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, Type, Image, ListFilter, Save, AlertCircle } from "lucide-react";
import axios from "axios";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Character count for description
  const descriptionLength = description.length;
  const maxLength = 100;

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

    // Validate category
    if (!["genser", "tskjorte"].includes(category.toLowerCase())) {
      setError("Kategori må være enten 'genser' eller 'tskjorte'");
      return;
    }

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
          timeout: 5000,
        }
      );

      setMsg(response.data.msg);

      if (response.data.success) {
        // Clear form after successful creation
        setTitle("");
        setDescription("");
        setImageUrl("");
        setCategory("");

        // Navigate to products page or stay on the same page
        setTimeout(() => navigate("/products"), 2000);
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Kunne ikke opprette produkt");
      console.error("Error creating product:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Opprett Nytt Produkt
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <Type className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Produkttittel"
            value={title}
            required
            className="flex-1 outline-none bg-transparent"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="relative border border-gray-300 rounded-md px-3 py-2">
          <div className="flex items-start">
            <Tag className="text-gray-500 mr-2 mt-2" size={18} />
            <textarea
              placeholder="Produktbeskrivelse (maks 100 tegn)"
              value={description}
              required
              className="flex-1 outline-none bg-transparent min-h-[80px]"
              onChange={(e) => setDescription(e.target.value)}
              maxLength={maxLength}
            />
          </div>
          <div
            className={`text-xs absolute bottom-2 right-3 ${
              descriptionLength > maxLength
                ? "text-red-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            {descriptionLength}/{maxLength} tegn
          </div>
        </div>

        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <Image className="text-gray-500 mr-2" size={18} />
          <input
            type="url"
            placeholder="Bilde URL"
            value={imageUrl}
            required
            className="flex-1 outline-none bg-transparent"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <ListFilter className="text-gray-500 mr-2" size={18} />
          <select
            value={category}
            required
            className="flex-1 outline-none bg-transparent"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Velg kategori</option>
            <option value="genser">Genser</option>
            <option value="tskjorte">T-skjorte</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200"
        >
          <Save size={18} />
          Lagre Produkt
        </button>
      </form>

      {error && (
        <div className="mt-4 flex items-center gap-2 bg-red-100 text-red-800 p-3 rounded-md">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {msg && (
        <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md text-center">
          {msg}
        </div>
      )}

      <button
        onClick={() => navigate("/products")}
        className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition duration-200"
      >
        Tilbake til produkter
      </button>
    </div>
  );
};

export default CreateProduct;
