import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, AlertCircle, Search } from "lucide-react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [promotionEmail, setPromotionEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (response.data.user && response.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setError("Du må være logget inn som admin for å se denne siden");
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        setError("Du må være logget inn som admin for å se denne siden");
        setTimeout(() => navigate("/"), 3000);
      }
    };

    checkAdmin();
  }, [navigate]);

  const handlePromoteUser = async (e) => {
    e.preventDefault();

    // Reset messages
    setMsg("");
    setError("");

    if (!promotionEmail) {
      setError("E-post må fylles ut");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/promote-to-admin`,
        { email: promotionEmail },
        { withCredentials: true }
      );

      setIsLoading(false);
      setMsg(response.data.msg || "Bruker forfremmet til admin");
      setPromotionEmail("");
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg || "Kunne ikke forfremme bruker");
      console.error("Error promoting user:", error);
    }
  };

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Shield className="mr-2" size={20} />
          Forfrem bruker til admin
        </h2>
        <form onSubmit={handlePromoteUser} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <Users className="text-gray-500 mr-2" size={18} />
            <input
              type="email"
              placeholder="Brukerens e-post"
              value={promotionEmail}
              required
              className="flex-1 outline-none bg-transparent"
              onChange={(e) => setPromotionEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Forfremmer...
              </>
            ) : (
              <>
                <Shield size={18} />
                Forfrem til Admin
              </>
            )}
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
      </div>
    </div>
  );
};

export default AdminPanel;
