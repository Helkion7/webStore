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
          <h1>Admin Panel</h1>

          <div>
            <h2>
              <Shield className="mr-2" size={20} />
              Forfrem bruker til admin
            </h2>
            <form onSubmit={handlePromoteUser}>
              <div>
                <Users />
                <input
                  type="email"
                  placeholder="Brukerens e-post"
                  value={promotionEmail}
                  required
                  onChange={(e) => setPromotionEmail(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div></div>
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
              <div>
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {msg && <div>{msg}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
