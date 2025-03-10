import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, LogOut } from "lucide-react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        { name, email, password, repeatPassword },
        { withCredentials: true, timeout: 5000 }
      );
      setMsg(response.data.msg);
      if (response.data.success) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMsg(error.response?.data?.msg || "Register failed");
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
        {/* Drum kit decoration */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#8A2BE2">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="#333333"
              stroke="#9370DB"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="3" fill="#9370DB" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-[#E0E0E0] text-center mt-2">
          JOIN THE BAND
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9370DB]">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Fullt Navn"
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#333333] text-[#E0E0E0] py-3 px-10 rounded-md border border-[#663399] focus:outline-none focus:ring-2 focus:ring-[#9370DB] transition-all"
            />
          </div>

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

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9370DB]">
              <Lock size={20} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Bekreft Passord"
              required
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full bg-[#333333] text-[#E0E0E0] py-3 px-10 rounded-md border border-[#663399] focus:outline-none focus:ring-2 focus:ring-[#9370DB] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9370DB] hover:text-[#8A2BE2] transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#333333] hover:bg-[#444444] text-[#E0E0E0] py-3 rounded-md border border-[#9370DB] transition-all hover:shadow-[0_0_10px_rgba(138,43,226,0.5)] font-bold flex items-center justify-center gap-2"
          >
            <span className="text-[#9370DB]">&#9836;</span> SIGN UP{" "}
            <span className="text-[#9370DB]">&#9836;</span>
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
          onClick={() => navigate("/login")}
          className="w-full mt-6 bg-transparent text-[#C0C0C0] py-2 hover:text-[#9370DB] transition-colors text-sm"
        >
          Har allerede en konto? Logg Inn
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

export default Register;
