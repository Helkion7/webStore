import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, AlertCircle, Search, ChevronLeft } from "lucide-react";
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
      <div className="max-w-md mx-auto p-6 bg-[#2D2D2D] rounded-lg shadow-lg border border-[#8A2BE2] text-[#E0E0E0]">
        <div className="flex items-center gap-2 bg-[#8B0000] bg-opacity-20 text-[#E0E0E0] p-4 rounded-md border border-[#8B0000]">
          <AlertCircle size={18} className="text-[#8B0000]" />
          <p>{error || "Sjekker admin-status..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-[#2D2D2D] rounded-lg shadow-lg border border-[#8A2BE2] p-6 text-[#E0E0E0]">
        <div className="flex justify-between items-center mb-8 border-b border-[#663399] pb-4">
          <h1 className="text-3xl font-bold text-[#9370DB] tracking-wide flex items-center gap-3">
            <Shield className="text-[#8A2BE2]" size={28} />
            Admin Panel
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#333333] hover:bg-[#444444] rounded-md transition-all duration-300 border border-[#8A2BE2] hover:shadow-[0_0_8px_rgba(138,43,226,0.6)]"
          >
            <ChevronLeft size={16} className="text-[#9370DB]" />
            <span>Tilbake</span>
          </button>
        </div>

        <div className="bg-[#333333] rounded-lg p-6 border border-[#444444] relative overflow-hidden">
          {/* Guitar neck decoration in background */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C0C0C0] via-[#8A2BE2] to-[#C0C0C0] opacity-50"></div>
          <div className="absolute top-0 left-4 w-1 h-full bg-gradient-to-b from-[#C0C0C0] via-[#8A2BE2] to-[#C0C0C0] opacity-30"></div>
          <div className="absolute top-0 left-8 w-1 h-full bg-gradient-to-b from-[#C0C0C0] via-[#8A2BE2] to-[#C0C0C0] opacity-10"></div>

          <h2 className="text-2xl font-bold mb-6 flex items-center text-[#9370DB] relative z-10">
            <Shield className="mr-3" size={22} />
            Forfrem bruker til admin
          </h2>

          <form
            onSubmit={handlePromoteUser}
            className="space-y-6 relative z-10"
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9370DB]">
                <Users size={18} />
              </div>
              <input
                type="email"
                placeholder="Brukerens e-post"
                value={promotionEmail}
                required
                onChange={(e) => setPromotionEmail(e.target.value)}
                className="w-full py-3 px-10 bg-[#1E1E1E] rounded-md border border-[#444444] focus:border-[#9370DB] focus:shadow-[0_0_0_2px_rgba(138,43,226,0.3)] outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#663399] to-[#8A2BE2] rounded-md font-semibold hover:from-[#8A2BE2] hover:to-[#9370DB] transition-all duration-300 hover:shadow-[0_0_12px_rgba(138,43,226,0.8)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-[#E0E0E0] border-t-transparent rounded-full"></div>
                  <span>Forfremmer...</span>
                </>
              ) : (
                <>
                  <Shield size={18} />
                  <span>Forfrem til Admin</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 flex items-center gap-2 bg-[#8B0000] bg-opacity-20 text-[#E0E0E0] p-4 rounded-md border border-[#8B0000] relative z-10">
              <AlertCircle size={18} className="text-[#8B0000]" />
              <p>{error}</p>
            </div>
          )}

          {msg && (
            <div className="mt-6 flex items-center gap-2 bg-[#663399] bg-opacity-20 text-[#E0E0E0] p-4 rounded-md border border-[#663399] relative z-10">
              <Shield size={18} className="text-[#9370DB]" />
              <p>{msg}</p>
            </div>
          )}
        </div>

        {/* Skull decorative element */}
        <div className="flex justify-center my-8">
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-[#663399] to-transparent relative">
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h1v2c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2h1c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM8.5 14.5l-1 1L9 17h2v-2h-2.5v-.5zM14 17h2l1.5-1.5-1-1H14v.5h-2v2h2v-.5zm.5-7h-5C9.22 10 9 9.78 9 9.5v-3C9 6.22 9.22 6 9.5 6h5c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5z"
                fill="#9370DB"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
