import { useState } from "react";
import "../styles/login.css";

function Register({ onBackLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const newUser = { username, password };
    localStorage.setItem("userAccount", JSON.stringify(newUser));
    alert("Registrasi berhasil, silakan login");
    onBackLogin();
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Register</h2>

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

        <button onClick={handleRegister}>Daftar</button>

        <p>
          Sudah punya akun?{" "}
          <span className="link" onClick={onBackLogin}>
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;