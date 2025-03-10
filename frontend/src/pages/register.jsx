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
      // Optionally refresh the page or redirect to home after logout
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMsg(error.response?.data?.msg || "Logout failed");
    }
  }

  return (
    <div>
      <h1>Registrer Deg</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <User />
          <input
            type="text"
            placeholder="Fullt Navn"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Mail />
          <input
            type="email"
            placeholder="E-post"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Lock />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Passord"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div>
          <Lock />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Bekreft Passord"
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <button type="submit">Registrer</button>
      </form>
      {msg && <p>{msg}</p>}
      <button onClick={() => navigate("/login")}>
        Har allerede en konto? Logg Inn
      </button>

      <div>
        <button onClick={handleLogout}>
          <LogOut size={18} />
          Logg Ut
        </button>
      </div>
    </div>
  );
};

export default Register;
