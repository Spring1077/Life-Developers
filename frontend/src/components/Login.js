import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [password, setPassword] = useState('prueba1');
  const [username, setUsername] = useState('JUANP');
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password123') {
      // Si las credenciales coinciden con el admin, redirige a la página de admin
      router.push("/AdminPage");
      return;
    }
    try {
      console.log("Sending login request...");
      const response = await axios.post(
        "http://localhost:4000/User/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
      console.log("Response data:", response.data);
      setMessage("Login exitoso. Redirigiendo...");
      router.push("/GamePage"); // Redirige a la página de inicio o al dashboard según sea necesario
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Sign in</h2>
          <h4>with your Rockwell Automation Account</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="underline"></div>
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              id="togglePassword"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            <div className="underline"></div>
          </div>
          <div className="options-group">
            <label className="checkbox-container">
              <input type="checkbox" id="keepSignedIn" />
              <span className="checkmark"></span> Keep me signed in
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <div className="button-group">
            <button type="submit">Ingresar</button>
            {message && <p className="mt-4 text-red-600">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
