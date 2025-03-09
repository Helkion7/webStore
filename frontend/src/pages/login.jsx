import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
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
        setTimeout(() => navigate("/Account"), 2000);
      }
    } catch (error) {
      setMsg(error.response?.data?.msg || "Login failed");
    }
  }

  return (
    <div>
      <h1>Logg Inn</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Logg Inn</button>
      </form>
      {msg && <p>{msg}</p>}
      <button onClick={() => navigate("/register")}>
        Har du ikke en konto? Registrer deg
      </button>
    </div>
  );
};

export default Login;
