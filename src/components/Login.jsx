import { useState } from "react";
import "../styles/login.css";

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("userAccount"));

    if (
      savedUser &&
      username === savedUser.username &&
      password === savedUser.password
    ) {
      onLogin();
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Belum punya akun?{" "}
          <span className="link" onClick={onShowRegister}>
            Daftar di sini
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;