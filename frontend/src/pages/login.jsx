import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true, timeout: 5000 }
      );
      setMsg(response.data.msg);
      if (response.data.success) {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setMsg(error.response?.data?.msg || "Login failed");
    }
  }

  async function handleLogout() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true, timeout: 5000 }
      );
      setMsg(response.data.msg);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMsg(error.response?.data?.msg || "Logout failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2D2D2D] p-8 rounded-lg shadow-lg border border-[#663399] relative">
        {/* Guitar decoration */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#8A2BE2">
            <path d="M19.59,3.41a2,2,0,0,0-2.83,0L14,6.17,17.83,10l2.76-2.76a2,2,0,0,0,0-2.83Z M7.76,13.37a4,4,0,0,0,0,5.66,4,4,0,0,0,5.66,0l2.92-2.92L13.17,13,10.26,15.9A1.94,1.94,0,0,1,7.76,13.37ZM14,7.58l-9.2,9.19a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L15.42,9Z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-[#E0E0E0] text-center mt-2">
          BACKSTAGE ACCESS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9370DB]">
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder="E-post"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#333333] text-[#E0E0E0] py-3 px-10 rounded-md border border-[#663399] focus:outline-none focus:ring-2 focus:ring-[#9370DB] transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9370DB]">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Passord"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#333333] text-[#E0E0E0] py-3 px-10 rounded-md border border-[#663399] focus:outline-none focus:ring-2 focus:ring-[#9370DB] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9370DB] hover:text-[#8A2BE2] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#333333] hover:bg-[#444444] text-[#E0E0E0] py-3 rounded-md border border-[#9370DB] transition-all hover:shadow-[0_0_10px_rgba(138,43,226,0.5)] font-bold flex items-center justify-center gap-2"
          >
            <span className="text-[#9370DB]">&#9835;</span> LOG IN{" "}
            <span className="text-[#9370DB]">&#9835;</span>
          </button>
        </form>

        {msg && (
          <div
            className={`mt-4 p-3 rounded-md text-center ${
              msg.includes("failed")
                ? "bg-[#8B0000] text-[#E0E0E0]"
                : "bg-[#333333] text-[#00BFFF] border border-[#00BFFF]"
            }`}
          >
            {msg}
          </div>
        )}

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-6 bg-transparent text-[#C0C0C0] py-2 hover:text-[#9370DB] transition-colors text-sm"
        >
          Har du ikke en konto? Registrer deg
        </button>

        <div className="mt-6 pt-6 border-t border-[#444444]">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full text-[#C0C0C0] hover:text-[#8B0000] transition-colors"
          >
            <LogOut size={16} />
            Logg Ut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
